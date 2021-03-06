let header = document.querySelector('[data-header]');
let menu = document.querySelector('[data-menu]');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('header--is-scroll', window.pageYOffset > 50);
    })

    if(menu) {
        let burger = document.querySelector('[data-action="open-menu"]');
        let closeBtns = document.querySelectorAll('[data-action="close-menu"]');
        let overlay = document.querySelector('.menu-overlay');

        burger.addEventListener('click', () => {
            menu.classList.add('menu--open');
            document.body.classList.add('overflow-hidden');
            overlay.classList.add('menu-is-open');
        })
        if(closeBtns.length) {
            closeBtns.forEach(closeBtn => {
                closeBtn.addEventListener('click', () => {
                    menu.classList.remove('menu--open');
                    document.body.classList.remove('overflow-hidden');
                    overlay.classList.remove('menu-is-open');
                })
            })
        }

        const setHeight = () => {
            if(document.documentElement.clientWidth < 992) {
                menu.style.height = document.documentElement.clientHeight + 'px';
            }
        }

        setHeight();

        window.addEventListener('resize', setHeight);
    }
}
