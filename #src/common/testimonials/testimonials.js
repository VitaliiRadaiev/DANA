{
    let testimonialsSection = document.querySelector('[data-testimonials]');
    if(testimonialsSection) {
        let list = testimonialsSection.querySelector('.testimonials-list');
        let listItems = testimonialsSection.querySelectorAll('.testimonials-list li');
        let btn = testimonialsSection.querySelector('.testimonials__mob-btn');
        let margin = 8;

        if(list && btn && listItems.length) {
            const setMaxHeight = () => {
                if(document.documentElement.clientWidth < 768) {
                    let height = listItems[0].clientHeight + margin;

                    if(listItems[1]) {
                        height += listItems[1].clientHeight + margin;
                    }
                    
                    list.style.maxHeight = height - 1 + 'px';
                }
            }

            setMaxHeight();
            let id = setInterval(setMaxHeight, 10);
            setTimeout(() => {
                clearInterval(id);
            }, 200)

            window.addEventListener('resize', setMaxHeight);

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                list.style.maxHeight = list.scrollHeight + margin + 'px';
                list.style.overflow = 'visible';
                btn.style.display = 'none';
                testimonialsSection.classList.add('testimonials--showed')

                setTimeout(() => {
                    list.removeAttribute('style');
                }, 300)
            })
        }
    }
}