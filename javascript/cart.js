// cart.js

// Função para adicionar produto ao carrinho
function addToCart(name, description, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex((product) => product.name === name);

    if (existingProductIndex !== -1) {
        // Se o produto já existir, incrementa a quantidade
        cart[existingProductIndex].quantity += 1;
    } else {
        // Caso contrário, adiciona o produto ao carrinho
        cart.push({ name, description, price, image, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
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

// Função para carregar o carrinho de compras na página de pedidos
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    cart.forEach((item, index) => {
        let orderItem = document.createElement('div');
        orderItem.className = 'order-item';

        // Estrutura do item do pedido, incluindo imagem
        orderItem.innerHTML = `
            <div class="product-info">
                <img src="${item.image}" alt="${item.name}" class="product-image">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="product-price">R$${item.price.toFixed(2)}</p>
            </div>
            <div class="quantity-control">
                <label>Quantidade:</label>
                <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            </div>
            <button class="remove-button" onclick="removeItem(${index})">Remover</button>
        `;

        orderList.appendChild(orderItem);
    });

    updateTotalPrice();
}

// Função para atualizar a quantidade de um produto no carrinho
function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotalPrice();
}

// Função para remover um item do carrinho
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Função para atualizar o preço total
function updateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').innerText = `Total: R$${totalPrice.toFixed(2)}`;

    // Mostrar ou esconder o botão "Concluir Compra"
    const finalizeButton = document.getElementById('finalize-button');
    if (cart.length > 0) {
        finalizeButton.style.display = 'block';
    } else {
        finalizeButton.style.display = 'none';
    }
}

// Função para finalizar a compra
function finalizePurchase() {
    // Verifica se o usuário está logado
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        // Finalizar a compra
        alert('Compra concluída com sucesso!');
        localStorage.removeItem('cart');
        loadCart();
    } else {
        // Redireciona para a página de login
        window.location.href = 'login.html';
    }
}

// Inicializa o carrinho ao carregar a página
window.onload = loadCart;
