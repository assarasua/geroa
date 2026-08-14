const dialog = document.querySelector("#demo-dialog");
const demoButton = document.querySelector(".demo-button");
const closeButton = document.querySelector(".dialog-close");
const menuButton = document.querySelector(".menu");
const nav = document.querySelector(".nav nav");

demoButton.addEventListener("click", () => dialog.showModal());
closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("mobile-open");
  menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("mobile-open");
    menuButton.textContent = "☰";
  });
});
