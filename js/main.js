console.log("Portfólio carregado com sucesso!");

// Alternar entre modo claro e escuro
const toggle = document.getElementById("theme-toggle");
const icon = document.getElementById("theme-icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

toggle.addEventListener("click", () => {
  const theme = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
});
