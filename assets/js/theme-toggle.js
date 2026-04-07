const storageKey = "b7-theme";
const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const sunIcon = document.querySelector("[data-theme-icon-sun]");
const moonIcon = document.querySelector("[data-theme-icon-moon]");
const announcer = document.querySelector("[data-announcer]");

const themeLabels = {
  dark: themeLabel?.dataset.labelDark || "Dark",
  light: themeLabel?.dataset.labelLight || "Light",
  aria: themeLabel?.dataset.labelAria || "Toggle color theme",
  toggleToDark: themeLabel?.dataset.labelToDark || "Activate dark theme",
  toggleToLight: themeLabel?.dataset.labelToLight || "Activate light theme",
  activeDark: themeLabel?.dataset.labelActiveDark || "Dark theme active",
  activeLight: themeLabel?.dataset.labelActiveLight || "Light theme active",
};

function syncThemeLabel(theme) {
  const isDark = theme === "dark";

  if (themeLabel) {
    themeLabel.textContent = isDark ? themeLabels.dark : themeLabels.light;
  }

  if (sunIcon && moonIcon) {
    sunIcon.hidden = isDark;
    moonIcon.hidden = !isDark;
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-label", isDark ? themeLabels.toggleToLight : themeLabels.toggleToDark);
    themeToggle.setAttribute("aria-description", themeLabels.aria);
    themeToggle.setAttribute("aria-pressed", String(isDark));
  }
}

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  syncThemeLabel(theme);
}

function announceTheme(theme) {
  if (!announcer) {
    return;
  }

  announcer.textContent = theme === "dark" ? themeLabels.activeDark : themeLabels.activeLight;
}

const storedTheme = window.localStorage.getItem(storageKey);
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const preferredTheme = storedTheme || (prefersDark.matches ? "dark" : "light");

applyTheme(preferredTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    window.localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
    announceTheme(nextTheme);
  });
}
