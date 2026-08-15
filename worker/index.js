const requestsByIp = new Map();

function json(body, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isRateLimited(ip) {
  const now = Date.now();
  const attempts = (requestsByIp.get(ip) || []).filter((time) => now - time < 60_000);
  attempts.push(now);
  requestsByIp.set(ip, attempts);
  return attempts.length > 5;
}

async function subscribe(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if (isRateLimited(ip)) return json({ error: "rate_limited" }, 429);

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_request" }, 400);
  }

  if (body.company) return json({ ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return json({ error: "invalid_email" }, 400);
  }

  const resendApiKey = env.Resend || env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("Resend secret is not configured");
    return json({ error: "service_unavailable" }, 503);
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (resendResponse.ok || resendResponse.status === 409) {
      return json({ ok: true });
    }

    console.error("Resend contact creation failed", resendResponse.status, await resendResponse.text());
    return json({ error: "subscription_failed" }, 502);
  } catch (error) {
    console.error("Resend request failed", error);
    return json({ error: "subscription_failed" }, 502);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/api/subscribe") {
      return subscribe(request, env);
    }

    if (url.pathname.startsWith("/api/")) {
      return json({ error: "not_found" }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
