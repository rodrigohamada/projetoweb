import { auth } from './env.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav ul.menu');

    // Criar botão de logout
    const logoutButton = document.createElement('button');
    logoutButton.id = 'logout-button';
    logoutButton.textContent = 'Logout';
    logoutButton.style.display = 'none';
    header.appendChild(logoutButton);

    // Elemento para mostrar o email do usuário
    const userEmailElement = document.createElement('span');
    userEmailElement.id = 'user-email';
    userEmailElement.style.marginRight = '10px';
    header.insertBefore(userEmailElement, logoutButton);

    // Verificar o estado de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Usuário está logado
            logoutButton.style.display = 'inline-block';
            userEmailElement.textContent = user.email;
            hideLoginLink();
        } else {
            // Usuário não está logado
            logoutButton.style.display = 'none';
            userEmailElement.textContent = '';
            showLoginLink();
        }
    });

    // Verificar se o botão de logout foi criado e adicione o evento
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            signOut(auth).then(() => {
                console.log('Usuário deslogado com sucesso');
                localStorage.removeItem('user');
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error('Erro ao fazer logout:', error);
            });
        });
    }

    function hideLoginLink() {
        const loginLink = nav.querySelector('#login-link');
        if (loginLink) {
            loginLink.style.display = 'none';
        }
    }

    function showLoginLink() {
        const loginLink = nav.querySelector('#login-link');
        if (loginLink) {
            loginLink.style.display = 'inline-block';
        }
    }

    // Verificar se o usuário está logado ao carregar a página
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        logoutButton.style.display = 'inline-block';
        userEmailElement.textContent = user.email;
        hideLoginLink();
    }
});
