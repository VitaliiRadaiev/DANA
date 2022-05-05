{
    let documentsSlider = document.querySelector('[data-documents-slider]');
    if(documentsSlider) {
        let sliderData = new Swiper(documentsSlider.querySelector('.swiper'), {
            speed: 800,
            navigation: {
                nextEl: documentsSlider.querySelector('.slider-button--next'),
                prevEl: documentsSlider.querySelector('.slider-button--prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 16,
                    autoHeight: true,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            },
        });
    }
}