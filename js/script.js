const buttonDropdown = document.querySelector(".button_header");
const menuDropdown = document.querySelector(".menu_header");
buttonDropdown.addEventListener("click", ()=> menuDropdown.classList.toggle("active"));

const navLinks = document.querySelector('.menu_header');
// Fechar o menu ao clicar em um link
document.querySelectorAll('.menu_header a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active'); // Fecha o menu
    });
});