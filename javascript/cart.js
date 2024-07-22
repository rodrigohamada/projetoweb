let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, description, price) {
    const product = { name, description, price, quantity: 1 };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Salva o carrinho no localStorage
    alert('Produto adicionado ao carrinho!');
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    let totalAmount = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Preço: R$${item.price.toFixed(2)}</p>
            <label for="quantity-${index}">Quantidade:</label>
            <input type="number" id="quantity-${index}" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
        `;
        cartItemsContainer.appendChild(cartItem);
        totalAmount += item.price * item.quantity;
    });

    document.getElementById('totalAmount').innerText = totalAmount.toFixed(2);
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o carrinho no localStorage
    updateCart();
}

document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    const clientName = document.getElementById('clientName').value;
    if (!clientName) {
        alert('Por favor, insira o nome do cliente.');
        return;
    }

    // Finalizar a compra
    alert('Compra finalizada com sucesso!');
    cart = [];
    localStorage.removeItem('cart'); // Limpa o carrinho no localStorage
    updateCart();
    document.getElementById('clientName').value = '';
});
