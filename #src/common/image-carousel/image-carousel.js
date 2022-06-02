{
    let imagesCarouselAll = document.querySelectorAll('[data-slider="images-carousel"]');
    if(imagesCarouselAll.length) {
        imagesCarouselAll.forEach(imagesCarousel => {
            let sliderData = new Swiper(imagesCarousel, {
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false,
                },
            
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: imagesCarousel.querySelector('.slider-button--next'),
                    prevEl: imagesCarousel.querySelector('.slider-button--prev'),
                },

            });
        })
    }
}