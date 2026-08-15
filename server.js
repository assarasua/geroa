const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const rateLimits = new Map();
const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function loadEnv(fileName) {
  const filePath = path.join(root, fileName);
  if (!fs.existsSync(filePath)) return;

  fs.readFileSync(filePath, "utf8").split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]]) return;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  });
}

loadEnv(".env.local");
loadEnv(".env");

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10_000) request.destroy();
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    request.on("error", reject);
  });
}

function isRateLimited(ip) {
  const now = Date.now();
  const attempts = (rateLimits.get(ip) || []).filter((time) => now - time < 60_000);
  attempts.push(now);
  rateLimits.set(ip, attempts);
  return attempts.length > 5;
}

async function subscribe(request, response) {
  const ip = request.socket.remoteAddress || "unknown";
  if (isRateLimited(ip)) {
    sendJson(response, 429, { error: "rate_limited" });
    return;
  }

  let body;
  try {
    body = await readJson(request);
  } catch {
    sendJson(response, 400, { error: "invalid_request" });
    return;
  }

  if (body.company) {
    sendJson(response, 200, { ok: true });
    return;
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    sendJson(response, 400, { error: "invalid_email" });
    return;
  }

  const resendApiKey = process.env.RESEND_API_KEY || process.env.Resend;
  if (!resendApiKey) {
    console.error("RESEND_API_KEY is not configured");
    sendJson(response, 503, { error: "service_unavailable" });
    return;
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    });

    if (resendResponse.ok || resendResponse.status === 409) {
      sendJson(response, 200, { ok: true });
      return;
    }

    const error = await resendResponse.text();
    console.error(`Resend contact creation failed (${resendResponse.status}): ${error}`);
    sendJson(response, 502, { error: "subscription_failed" });
  } catch (error) {
    console.error("Resend request failed:", error.message);
    sendJson(response, 502, { error: "subscription_failed" });
  }
}

function serveStatic(request, response) {
  const url = new URL(request.url, "http://localhost");
  const requestedPath = url.pathname === "/" ? "/index.html" : url.pathname;
  const filePath = path.resolve(root, `.${decodeURIComponent(requestedPath)}`);

  if (!filePath.startsWith(`${root}${path.sep}`)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, contents) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    response.writeHead(200, {
      "Content-Type": mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    });
    response.end(contents);
  });
}

const server = http.createServer(async (request, response) => {
  if (request.method === "POST" && request.url === "/api/subscribe") {
    await subscribe(request, response);
    return;
  }

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD, POST" });
    response.end("Method not allowed");
    return;
  }

  serveStatic(request, response);
});

const port = Number(process.env.PORT) || 4173;
server.listen(port, () => {
  console.log(`Geroa running at http://localhost:${port}`);
});
