{
    let infoCardsListAll = document.querySelectorAll('[data-slider="info-cards-list"]');
    if(infoCardsListAll.length) {
        infoCardsListAll.forEach(infoCardsList => {

            const slider = infoCardsList;
            if(slider) {
                let mySwiper;
        
                function mobileSlider() {
                    if(document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
                        mySwiper = new Swiper(slider, {
                            slidesPerView: 'auto',
                            speed: 600,
                            spaceBetween: 16,
                        });
        
                        slider.dataset.mobile = 'true';
        
                        //mySwiper.slideNext(0);
                    }
        
                    if(document.documentElement.clientWidth > 767) {
                        slider.dataset.mobile = 'false';
        
                        if(slider.classList.contains('swiper-initialized')) {
                            mySwiper.destroy();
                        }
                    }
                }
        
                mobileSlider();
        
                window.addEventListener('resize', () => {
                    mobileSlider();
                })
            }
        })
    }
}