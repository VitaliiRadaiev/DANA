{
    let certificates = document.querySelector('[data-slider="certificates"]');
    if(certificates) {
        let desk = certificates.querySelector('.certificates__slider-desk');
        let mob = certificates.querySelector('.certificates__slider-mob');

        if(desk && mob) {
            let mobSwiper = new Swiper(mob, {
                observer: true,
                observeParents: true,
                speed: 600,
                loopAdditionalSlides: 1,
                
                breakpoints: {
                    320: {
                        slidesPerView: 'auto',
                        spaceBetween: 16,
                        centeredSlides: false,
                        touchRatio: 1,
                        loop: false,
                    },
                    768: {
                        slidesPerView: 'auto',
                        spaceBetween: 32,
                        centeredSlides: false,
                        touchRatio: 1,
                        loop: false,
                    },
                    992: {
                        slidesPerView: 'auto',
                        spaceBetween: 0,
                        centeredSlides: true,
                       // touchRatio: 0,
                        loop: true,
                    }
                },
            });

            let deskSwiper = new Swiper(desk, {
                effect: 'fade',
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 0,
                speed: 600,
                loop: true,
                loopAdditionalSlides: 3,
                pagination: {
                	el: desk.querySelector('.swiper-pagination'),
                    type: 'fraction',
                },
                navigation: {
                    nextEl: desk.querySelector('.certificates__slider-btn.next'),
                    prevEl: desk.querySelector('.certificates__slider-btn.prev'),
                },
                // on: {
                //     activeIndexChange: function (e) {
                //         console.log(e);
                //         //mobSwiper.slideTo(e.activeIndex);
                //     },
                // }
            });

            deskSwiper.controller.control = mobSwiper
            mobSwiper.controller.control = deskSwiper
        }
    }
}