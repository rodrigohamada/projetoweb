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
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
            .then((userCredential) => {
                // Adicionar os dados do usuário ao Firestore
                var user = userCredential.user;
                return firebase.firestore().collection('users').doc(user.uid).set({
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
                });
            })
            .then(() => {
                // Exibir mensagem de sucesso e fechar o pop-up
                showConfirmationPopup('Usuário cadastrado com sucesso!');
                $('#overlay').fadeOut(300);
            })
            .catch((error) => {
                // Exibir mensagem de erro
                showConfirmationPopup('Erro ao cadastrar usuário: ' + error.message);
            });
    });

    // Fechar a mensagem de confirmação de cadastro
    $(document).on('click', '#confirm-button', function () {
        $('.confirmation-popup').fadeOut(300);
    });
});

// Função para buscar informações de endereço pelo CEP utilizando a API dos Correios
function buscarCEP() {
    const cep = $('#cep').val().replace(/\D/g, '');

    if (cep.length != 8) {
        alert('CEP inválido');
        return;
    }

    $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        if (!("erro" in data)) {
            $('#rua').val(data.logradouro);
            $('#cidade').val(data.localidade);
            $('#estado').val(data.uf);
            $('#bairro').val(data.bairro);
        } else {
            alert('CEP não encontrado');
        }
    });
}

// Função para verificar se um e-mail é válido
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para exibir a mensagem de confirmação
function showConfirmationPopup(message) {
    $('.confirmation-popup .confirmation-message').text(message);
    $('.confirmation-popup').fadeIn(300);
}
