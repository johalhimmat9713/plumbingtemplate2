const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");

menuButton.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isExpanded));
  menuButton.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    siteNav.classList.remove("is-open");
    menuButton.focus();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = `Plumbing request from ${formData.get("name")}`;
    const message = [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      `ZIP code: ${formData.get("postal-code") || "Not provided"}`,
      `Service: ${formData.get("service") || "Not specified"}`,
      "",
      "What do you need help with?",
      formData.get("message"),
      "",
      "Anything else we should know?",
      formData.get("notes") || "None"
    ].join("\n");
    const mailto = `mailto:hello@yourplumbingcompany.example?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    document.querySelector("#form-status").textContent = "Opening your email app with these details. The example address is a placeholder and cannot receive email.";
    window.location.href = mailto;
  });
}