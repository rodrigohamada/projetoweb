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
            
            // Cria o HTML do produto
            const productHTML = `
                <img src="${product.imagem}" alt="${product.titulo}">
                <div class="product-info">
                    <h3 class="product-name">${product.titulo}</h3>
                    <p class="product-description">${product.descricao}</p>
                    <p class="product-price">R$${product.preco.toFixed(2)}</p>
                    <button class="buy-button" data-name="${product.titulo}" data-description="${product.descricao}" data-price="${product.preco}" data-image="${product.imagem}">Comprar</button>
                </div>
            `;

            productItem.innerHTML = productHTML;
            productContainer.appendChild(productItem);
        });

        // Selecionar todos os botões de compra
        const buyButtons = document.querySelectorAll('.buy-button');

        // Adicionar event listener a cada botão de compra
        buyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const name = this.getAttribute('data-name');
                const description = this.getAttribute('data-description');
                const price = parseFloat(this.getAttribute('data-price'));
                const image = this.getAttribute('data-image');
                
                // Chama a função addToCart passando os dados do produto
                addToCart(name, description, price, image);
            });
        });

    } catch (error) {
        console.error("Erro ao carregar produtos: ", error);
    }
});

// Função para adicionar produtos ao carrinho
function addToCart(name, description, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex((product) => product.name === name);

    if (existingProductIndex !== -1) {
        // Se o produto já existir, incrementa a quantidade
        cart[existingProductIndex].quantity += 1;
    } else {
        // Caso contrário, adiciona o produto ao carrinho
        cart.push({ name, description, price, image, quantity: 1 }); // Inclui a imagem
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado à página de Pedidos!');
    updateCartCounter();
}

// Função para atualizar o contador do carrinho
function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.innerText = cart.length.toString();
    }
}
