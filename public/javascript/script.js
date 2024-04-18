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

