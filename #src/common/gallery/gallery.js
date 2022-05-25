{
    let gallery = document.querySelector('[data-slider="gallery"]');
    if(gallery) {
        let sliderData = new Swiper(gallery.querySelector('.swiper'), {
            slidesPerView: 'auto',
            spaceBetween: 0,
            speed: 400,

            navigation: {
                nextEl: gallery.querySelector('.gallery__btn.next'),
                prevEl: gallery.querySelector('.gallery__btn.prev'),
            },
        });
    }
}