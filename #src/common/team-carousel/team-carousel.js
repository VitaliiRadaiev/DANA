{
    let teamCarousel = document.querySelector('[data-team-carousel-slider]');
    if(teamCarousel) {
        let sliderData = new Swiper(teamCarousel, {
            speed: 800,
            loop: true,
            navigation: {
                nextEl: teamCarousel.querySelector('.slider-button--next'),
                prevEl: teamCarousel.querySelector('.slider-button--prev'),
            },
            breakpoints: {
                320: {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 0,
                }
            },
        });
    }
}