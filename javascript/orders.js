document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const logoutButton = document.getElementById('logout-button');
        const userEmailElement = document.getElementById('user-email');
        if (logoutButton) logoutButton.style.display = 'inline-block';
        if (userEmailElement) userEmailElement.textContent = user.email;
        const loginLink = document.getElementById('login-link');
        if (loginLink) loginLink.style.display = 'none';
    }
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderList = document.getElementById('order-list');
    orderList.innerHTML = '';

    cart.forEach((item, index) => {
        let orderItem = document.createElement('div');
        orderItem.className = 'order-item';

        let productInfo = document.createElement('div');
        productInfo.className = 'product-info';
        productInfo.innerHTML = `<img src="${item.image}" alt="${item.name}" class="product-image">
                                 <h3>${item.name}</h3>
                                 <p>${item.description}</p>
                                 <p class="product-price">R$${item.price.toFixed(2)}</p>`;

        let quantityInput = document.createElement('div');
        quantityInput.className = 'quantity-input';
        quantityInput.innerHTML = `<label>Quantidade:</label><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">`;

        let removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.innerText = 'Remover';
        removeButton.onclick = () => removeItem(index);

        orderItem.appendChild(productInfo);
        orderItem.appendChild(quantityInput);
        orderItem.appendChild(removeButton);

        orderList.appendChild(orderItem);
    });

    updateTotalPrice();
}

function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity = parseInt(quantity);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotalPrice();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

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

function finalizePurchase() {
    // Verifica se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('Status de Login:', user);

    if (user) {
        // Exibir resumo do pedido e perguntar se deseja confirmar a compra
        const confirmation = confirm(`Resumo do pedido:\n\n${getOrderSummary()}\n\nDeseja confirmar a compra?`);
        if (confirmation) {
            alert('Compra concluída com sucesso!');
            localStorage.removeItem('cart');
            loadCart();
        }
    } else {
        alert('Você precisa estar logado para concluir a compra.');
        window.location.href = 'login.html';
    }
}

function getOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let summary = cart.map(item => `${item.name} (Quantidade: ${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}`).join('\n');
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summary += `\n\nTotal: R$${totalPrice.toFixed(2)}`;
    return summary;
}

window.onload = loadCart;
