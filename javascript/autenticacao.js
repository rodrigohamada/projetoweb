import { auth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', function () {
    const protectedLinks = document.querySelectorAll('.protected');
    const loginLink = document.getElementById('login-link');
    const logoutLink = document.getElementById('logout-link');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuário está logado
            protectedLinks.forEach(link => link.style.display = 'block');
            loginLink.style.display = 'none';
            logoutLink.style.display = 'block';
        } else {
            // Usuário não está logado
            protectedLinks.forEach(link => link.style.display = 'none');
            loginLink.style.display = 'block';
            logoutLink.style.display = 'none';
        }
    });

    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault();
            auth.signOut()
                .then(() => {
                    alert('Você foi deslogado com sucesso.');
                    window.location.href = 'index.html'; // Redirecionar para a página inicial após o logout
                })
                .catch((error) => {
                    console.error('Erro ao fazer logout:', error);
                });
        });
    }
});
