{
    let gallerySecondAll = document.querySelectorAll('[data-slider="gallery-second"]');
    if(gallerySecondAll.length) {
        gallerySecondAll.forEach(gallerySecond => {
            let sliderData = new Swiper(gallerySecond.querySelector('.swiper'), {
                observer: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 0,
                speed: 600,
                loop: true,
                navigation: {
                    nextEl: gallerySecond.querySelector('.slider-button--next'),
                    prevEl: gallerySecond.querySelector('.slider-button--prev'),
                },
            });
            
        })
    }
}