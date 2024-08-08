import { auth, db } from './env.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', function () {
    const registerPopup = document.getElementById('register-popup');
    const closeButton = document.getElementById('close');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const buscarCepButton = document.getElementById('buscar-cep');

    if (registerPopup) {
        registerPopup.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById('overlay').style.display = 'block';
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            document.getElementById('overlay').style.display = 'none';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const userData = {
                name: this.name.value,
                phone: this.phone.value,
                cep: this.cep.value,
                rua: this.rua.value,
                cidade: this.cidade.value,
                estado: this.estado.value,
                bairro: this.bairro.value,
                numero: this.numero.value,
                complemento: this.complemento.value,
                email: this.email.value,
                password: this.password.value,
            };

            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then((userCredential) => {
                    const user = userCredential.user;
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
                    alert('Cadastro realizado com sucesso!');
                    document.getElementById('overlay').style.display = 'none';
                    registerForm.reset();
                    
                    // Redireciona para a página principal
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Erro ao criar usuário:', error);
                    alert('Erro ao realizar cadastro: ' + error.message);
                });
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.email.value;
            const password = this.password.value;

            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    
                    // Obtenha as informações do Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        
                        // Armazene no localStorage
                        localStorage.setItem('user', JSON.stringify({
                            email: user.email,
                            uid: user.uid,
                            name: userData.name,
                            phone: userData.phone,
                            cep: userData.cep,
                            rua: userData.rua,
                            cidade: userData.cidade,
                            estado: userData.estado,
                            bairro: userData.bairro,
                            numero: userData.numero,
                            complemento: userData.complemento
                        }));
                    }
                    
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error('Erro ao fazer login:', error);
                    alert('Erro ao fazer login: ' + error.message);
                });
        });
    }

    if (buscarCepButton) {
        buscarCepButton.addEventListener('click', function () {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            if (cep) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!('erro' in data)) {
                            document.getElementById('rua').value = data.logradouro;
                            document.getElementById('bairro').value = data.bairro;
                            document.getElementById('cidade').value = data.localidade;
                            document.getElementById('estado').value = data.uf;
                        } else {
                            alert('CEP não encontrado.');
                        }
                    })
                    .catch(() => {
                        alert('Erro ao buscar CEP.');
                    });
            } else {
                alert('Por favor, insira um CEP válido.');
            }
        });
    }

    // Verificar o estado de autenticação
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Aqui você pode obter o documento do usuário novamente, se necessário
            getDoc(doc(db, 'users', user.uid)).then(userDoc => {
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    localStorage.setItem('user', JSON.stringify({
                        email: user.email,
                        uid: user.uid,
                        name: userData.name,
                        phone: userData.phone,
                        cep: userData.cep,
                        rua: userData.rua,
                        cidade: userData.cidade,
                        estado: userData.estado,
                        bairro: userData.bairro,
                        numero: userData.numero,
                        complemento: userData.complemento
                    }));
                }
            });
        } else {
            localStorage.removeItem('user');
        }
    });
});
