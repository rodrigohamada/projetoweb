$(document).ready(function () {
    // Ativar/desativar o menu para dispositivos móveis
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

// Função para carregar produtos do carrinho na página de Cadastro de Pedidos
function loadCartProducts() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderList = document.getElementById('order-list');
    let totalPrice = 0;

    orderList.innerHTML = ''; // Limpar conteúdo atual

    cart.forEach(product => {
        // Criar elemento para o produto
        let productElement = document.createElement('div');
        productElement.classList.add('order-item');

        // Montar HTML do produto
        productElement.innerHTML = `
            
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <div class="quantity-input">
                    <label for="quantity-${product.id}">Quantidade:</label>
                    <input type="number" id="quantity-${product.id}" value="${product.quantity}" min="1">
                </div>
            </div>
        `;

        // Adicionar ao DOM
        orderList.appendChild(productElement);

        // Calcular preço total
        totalPrice += product.price * product.quantity;
    });

    // Atualizar preço total
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Carregar produtos do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    loadCartProducts();
});


