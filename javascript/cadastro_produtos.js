import { auth, db, storage } from './env.js';
import { collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js';

document.addEventListener('DOMContentLoaded', function () {
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log("Usuário autenticado:", user);
            setupProductForm();
        } else {
            console.log("Usuário não autenticado, redirecionando para a página de login.");
            window.location.href = 'login.html';
        }
    });
});

function setupProductForm() {
    const registerButton = document.getElementById('register-button');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productDescriptionInput = document.getElementById('productDescription');
    const productImageInput = document.getElementById('productImage');

    registerButton.addEventListener('click', async function (e) {
        e.preventDefault();

        const name = productNameInput.value;
        const price = parseFloat(productPriceInput.value);
        const description = productDescriptionInput.value;
        const imageFile = productImageInput.files[0];

        if (!name || isNaN(price) || !description || !imageFile) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        try {
            console.log("Iniciando upload da imagem");
            const storageRef = ref(storage, 'product_images/' + Date.now() + '_' + imageFile.name);
            await uploadBytes(storageRef, imageFile);
            const imageUrl = await getDownloadURL(storageRef);
            console.log("Upload da imagem concluído, URL da imagem:", imageUrl);

            console.log("Cadastrando produto no Firestore");
            const docRef = await addDoc(collection(db, 'products'), {
                titulo: name,
                preco: price,
                descricao: description,
                imagem: imageUrl
            });

            console.log('Produto cadastrado com ID: ', docRef.id);

            alert('Produto cadastrado com sucesso!');

            productNameInput.value = '';
            productPriceInput.value = '';
            productDescriptionInput.value = '';
            productImageInput.value = '';
        } catch (error) {
            console.error('Erro ao cadastrar produto: ', error);
            alert('Erro ao cadastrar produto. Por favor, tente novamente.');
        }
    });
}
