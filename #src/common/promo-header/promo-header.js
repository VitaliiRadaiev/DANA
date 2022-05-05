{
    let promoHeaderSlider = document.querySelector('[data-promo-header-slider]');
    if(promoHeaderSlider) {
        let sliderData = new Swiper(promoHeaderSlider, {
            effect: document.documentElement.clientWidth < 992 ? 'slide' : 'fade',
            slidesPerView: 1,
            spaceBetween: 20,
            autoHeight: true,
            speed: 600,
            loop: true,
            navigation: {
                nextEl: promoHeaderSlider.querySelector('.slider-button--next'),
                prevEl: promoHeaderSlider.querySelector('.slider-button--prev'),
            },
        });
    }
}