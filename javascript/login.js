import { auth, db } from './env.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

$(document).ready(function () {
    // Abrir pop-up de cadastro
    $('#register-popup').click(function (e) {
        e.preventDefault();
        $('#overlay').fadeIn(300);
    });

    // Fechar pop-up de cadastro
    $('#close').click(function () {
        $('#overlay').fadeOut(300);
    });

    // Submeter formulário de cadastro
    $('#register-form').submit(function (e) {
        e.preventDefault();

        // Obter os dados do formulário
        var userData = {
            name: $(this).find('input[name="name"]').val(),
            phone: $(this).find('input[name="phone"]').val(),
            cep: $(this).find('input[name="cep"]').val(),
            rua: $(this).find('input[name="rua"]').val(),
            cidade: $(this).find('input[name="cidade"]').val(),
            estado: $(this).find('select[name="estado"]').val(),
            bairro: $(this).find('input[name="bairro"]').val(),
            numero: $(this).find('input[name="numero"]').val(),
            complemento: $(this).find('input[name="complemento"]').val(),
            email: $(this).find('input[name="email"]').val(),
            password: $(this).find('input[name="password"]').val(),
        };

        // Criar usuário no Firebase Authentication
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential) => {
                // Obter o usuário criado
                const user = userCredential.user;

                // Salvar dados adicionais no Firestore
                return setDoc(doc(db, 'users', user.uid), {
                    name: userData.name,
                    phone: userData.phone,
                    cep: userData.cep,
                    rua: userData.rua,
                    cidade: userData.cidade,
                    estado: userData.estado,
                    bairro: userData.bairro,
                    numero: userData.numero,
                    complemento: userData.complemento,
                });
            })
            .then(() => {
                // Exibir mensagem de confirmação
                showConfirmationMessage('Cadastro realizado com sucesso!');
                // Fechar pop-up de cadastro
                $('#overlay').fadeOut(300);
                $('#register-form')[0].reset(); // Limpar o formulário
            })
            .catch((error) => {
                // Tratar erros
                console.error('Erro ao criar usuário:', error);
                showAlertMessage('Erro ao realizar cadastro: ' + error.message);
            });
    });

    // Submeter formulário de login
    $('#login-form').submit(function (e) {
        e.preventDefault();
        var email = $(this).find('input[name="email"]').val();
        var password = $(this).find('input[name="password"]').val();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Redirecionar para a página de pedidos
                window.location.href = 'cadastro_pedidos.html';
            })
            .catch((error) => {
                // Tratar erros de login
                console.error('Erro ao fazer login:', error);
                showAlertMessage('Erro ao fazer login: ' + error.message);
            });
    });

    // Função para buscar endereço pelo CEP
    $('#buscar-cep').click(function () {
        var cep = $('#cep').val().replace(/\D/g, '');
        if (cep) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
                if (!('erro' in data)) {
                    $('#rua').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#cidade').val(data.localidade);
                    $('#estado').val(data.uf);
                } else {
                    showAlertMessage('CEP não encontrado.');
                }
            }).fail(function () {
                showAlertMessage('Erro ao buscar CEP.');
            });
        } else {
            showAlertMessage('Por favor, insira um CEP válido.');
        }
    });

    // Função para exibir mensagens de confirmação
    function showConfirmationMessage(message) {
        if (confirm(message)) {
            $('#confirmation-popup').fadeOut(300);
        }
    }

    // Função para exibir alertas
    function showAlertMessage(message) {
        alert(message);
    }
});
