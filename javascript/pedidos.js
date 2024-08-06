// Função para carregar o carrinho de compras na página de pedidos
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderList = document.getElementById('order-list');
    let emptyCartMessage = document.getElementById('empty-cart-message');
    orderList.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
    } else {
        emptyCartMessage.style.display = 'none';
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
    }

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
function finalizePurchase(event) {
    if (event) {
        event.preventDefault(); // Previne o comportamento padrão do botão
    }

    // Verifica se o usuário está logado
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // Exibir modal de confirmação
        const modal = document.getElementById('confirmation-modal');
        const orderSummaryElement = document.getElementById('order-summary');

        // Exibir informações do pedido
        orderSummaryElement.innerHTML = `<pre>${getOrderSummary()}</pre>`;

        // Exibir informações do usuário
        const userInfoElement = document.getElementById('user-info');
        userInfoElement.innerHTML = `
            <h4>Informações do Usuário:</h4>
            <p>Nome: ${user.name}</p>
            <p>Email: ${user.email}</p>
            <p>Telefone: ${user.phone}</p>
            <p>Endereço: ${user.rua}, ${user.numero}, ${user.bairro}</p>
            <p>Cidade: ${user.cidade} - ${user.estado}</p>
            <p>CEP: ${user.cep}</p>
        `;

        modal.style.display = 'flex'; // Mostra o modal
    } else {
        alert('Você precisa estar logado para concluir a compra.');
        window.location.href = 'login.html';
    }
}

// Função para obter o resumo do pedido
function getOrderSummary() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let summary = cart.map(item => `${item.name} (Quantidade: ${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}`).join('\n');
    let totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    summary += `\n\nTotal: R$${totalPrice.toFixed(2)}`;
    return summary;
}

// Inicializa o carrinho ao carregar a página
window.onload = loadCart;

// Atualiza a visibilidade do botão de logout e do link de login
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

// Ativar/desativar o menu para dispositivos móveis
$(document).ready(function () {
    $('.mobile-menu-icon').click(function () {
        $('nav ul.menu').toggleClass('menu-active');
    });

    // Fechar o menu quando um item for clicado
    $('nav ul.menu li a').click(function () {
        $('nav ul.menu').removeClass('menu-active');
    });

    // Função para atualizar o conteúdo do slide
    function updateSlideInfo(currentSlide) {
        const slideInfo = $('.slick-slide').eq(currentSlide).find('.slide-info');
        const title = slideInfo.find('.title').text();
        const description = slideInfo.find('.description').text();
        $('.slide-info h2').text(title);
        $('.slide-info p').text(description);
    }

    // Inicialização do Slick Carousel
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: function (event, slick, currentSlide) {
            updateSlideInfo(currentSlide);
        }
    });

    // Navegação manual pelos slides
    $('#home-link').click(function (event) {
        event.preventDefault();
        window.location.href = "index.html";
    });
});

// Adicionar event listener ao botão de logout
const logoutButton = document.getElementById('logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    });
}

// Controle do modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('confirmation-modal');
    const closeButton = document.getElementById('cancel-button');
    const confirmButton = document.getElementById('confirm-button');

    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    if (confirmButton) {
        confirmButton.addEventListener('click', function() {
            alert('Compra concluída com sucesso!');
            localStorage.removeItem('cart');
            loadCart();
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Adiciona event listener ao botão "Concluir Compra"
    const finalizeButton = document.getElementById('finalize-button');
    if (finalizeButton) {
        finalizeButton.removeEventListener('click', finalizePurchase); // Remove eventuais listeners duplicados
        finalizeButton.addEventListener('click', finalizePurchase); // Adiciona o listener de clique
    }
});
