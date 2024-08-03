import { db } from './env.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', async function () {
    const productContainer = document.getElementById('product-container');

    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        querySnapshot.forEach((doc) => {
            const product = doc.data();
            const productItem = document.createElement('div');
            productItem.className = 'product-item';

            const productHTML = `
                <img src="${product.imagem}" alt="${product.titulo}">
                <div class="product-info">
                    <h3 class="product-name">${product.titulo}</h3>
                    <p class="product-description">${product.descricao}</p>
                    <p class="product-price">R$${product.preco.toFixed(2)}</p>
                    <button class="buy-button" onclick="addToCart('${product.titulo}', '${product.descricao}', ${product.preco})">Comprar</button>
                </div>
            `;

            productItem.innerHTML = productHTML;
            productContainer.appendChild(productItem);
        });
    } catch (error) {
        console.error("Erro ao carregar produtos: ", error);
    }
});
