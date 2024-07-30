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
            password: $(this).find('input[name="password"]').val()
        };

        // Verificar se todos os campos estão preenchidos
        var allFieldsFilled = Object.values(userData).every(function (value) {
            return value !== '';
        });
        if (!allFieldsFilled) {
            showConfirmationPopup('Por favor, preencha todos os campos.');
            return;
        }

        // Verificar se o e-mail é válido
        if (!isValidEmail(userData.email)) {
            showConfirmationPopup('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        // Criar usuário no Firebase Authentication
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential) => {
                // Adicionar os dados do usuário ao Firestore
                var user = userCredential.user;
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
                    email: userData.email
                    // A senha não é armazenada no Firestore
                });
            })
            .then(() => {
                // Exibir mensagem de sucesso e fechar o pop-up
                showConfirmationPopup('Usuário cadastrado com sucesso!');
                $('#overlay').fadeOut(300);
                // Limpar o formulário
                $('#register-form')[0].reset();
            })
            .catch((error) => {
                // Exibir mensagem de erro
                showConfirmationPopup('Erro ao cadastrar usuário: ' + error.message);
            });
    });

    // Submeter formulário de login
    $('#login-form').submit(function (e) {
        e.preventDefault();
        // Obter os dados do formulário de login
        var email = $(this).find('input[name="email"]').val();
        var password = $(this).find('input[name="password"]').val();

        // Verificar se o e-mail é válido
        if (!isValidEmail(email)) {
            showConfirmationPopup('Por favor, insira um endereço de e-mail válido.');
            return;
        }

        // Logar usuário no Firebase Authentication
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuário logado com sucesso
                showConfirmationPopup('Login realizado com sucesso!');
                // Redirecionar o usuário para a dashboard após o login
                window.location.href = "dashboard.html";
            })
            .catch((error) => {
                // Exibir mensagem de erro
                showConfirmationPopup('Erro ao fazer login: ' + error.message);
            });
    });

    // Função para buscar o endereço pelo CEP
    function buscarEndereco(cep) {
        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (!data.erro) {
                    $('input[name="rua"]').val(data.logradouro);
                    $('input[name="bairro"]').val(data.bairro);
                    $('input[name="cidade"]').val(data.localidade);
                    $('select[name="estado"]').val(data.uf);
                } else {
                    showConfirmationPopup('CEP não encontrado.');
                }
            },
            error: function () {
                showConfirmationPopup('Erro ao buscar o CEP.');
            }
        });
    }

    // Evento para buscar o endereço pelo CEP
    $('#buscar-cep').click(function () {
        var cep = $('input[name="cep"]').val();
        if (cep) {
            buscarEndereco(cep);
        } else {
            showConfirmationPopup('Por favor, insira um CEP.');
        }
    });
});

// Função para exibir pop-up de confirmação
function showConfirmationPopup(message) {
    $('#confirmation-message').text(message);
    $('#confirmation-popup').fadeIn(300);
    $('#confirm-button').click(function () {
        $('#confirmation-popup').fadeOut(300);
    });
}

// Função para validar e-mail
function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
