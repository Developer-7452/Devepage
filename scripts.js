function toggleMenu() {
    var menu = document.getElementById("dropdown-menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
},
function toggleTheme() {
    document.body.classList.toggle("dark-mode");

    // Cambia el texto del botón según el tema
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Oscuro";
}
