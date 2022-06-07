{
    let sticyBox = document.querySelector('.main-grid__sticky-box');
    if (sticyBox) {
        let header = document.querySelector('[data-header]');
        let currentScrollValue = window.pageYOffset;
        let sticyBoxMouseOver = false;
        let sticyScrollValue = 0;

        window.addEventListener('scroll', (e) => {

            if (window.pageYOffset > currentScrollValue) {
                if ((sticyBox.offsetTop + sticyBox.clientHeight) > (sticyBox.parentElement.clientHeight - 100)) {
                    sticyBox.style.transform = `translateY(0px)`;
                } else {
                    if (sticyBoxMouseOver && document.documentElement.clientWidth > 991.98) {
                        if (sticyBox.clientHeight > (document.documentElement.clientHeight - header.clientHeight - 50)) {
                            sticyBox.style.transform = `translateY(-${sticyBox.clientHeight - (document.documentElement.clientHeight - header.clientHeight - 50)}px)`
                        }
                    }
                }
            } else {
                if (sticyBox.offsetTop < 50) {
                    sticyBox.style.transform = `translateY(0px)`;
                } else {
                    if (sticyBoxMouseOver && document.documentElement.clientWidth > 991.98) {
                        sticyBox.style.transform = `translateY(0px)`;
                    }
                }
            }

            currentScrollValue = window.pageYOffset;
        })

        sticyBox.addEventListener('mouseenter', () => {
            sticyBoxMouseOver = true;
        })
        sticyBox.addEventListener('mouseleave', () => {
            sticyBoxMouseOver = false;
        })
    }
}