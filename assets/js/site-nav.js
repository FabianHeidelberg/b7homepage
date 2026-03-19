const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");

if (navToggle && navPanel) {
  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function setNavState(isOpen) {
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navPanel.classList.toggle("is-open", isOpen);

    if (isOpen) {
      const firstLink = navPanel.querySelector("a[href]");
      firstLink?.focus();
    } else {
      navToggle.focus();
    }
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!expanded);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navPanel.classList.contains("is-open")) {
      setNavState(false);
    }

    if (event.key === "Tab" && navPanel.classList.contains("is-open")) {
      const focusable = Array.from(navPanel.querySelectorAll(focusableSelector));

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (!navPanel.classList.contains("is-open")) {
      return;
    }

    if (navPanel.contains(event.target) || navToggle.contains(event.target)) {
      return;
    }

    setNavState(false);
  });
}
