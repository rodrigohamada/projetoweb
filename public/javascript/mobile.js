// Seleciona o ícone do menu e o menu
const menuIcon = document.querySelector('.mobile-menu-icon');
const menu = document.querySelector('.menu');

// Adiciona um evento de clique no ícone do menu
menuIcon.addEventListener('click', function () {
    // Toggle da classe 'open' no menu
    menu.classList.toggle('open');
    // Toggle da classe 'open' no ícone do menu
    this.classList.toggle('open');
});

