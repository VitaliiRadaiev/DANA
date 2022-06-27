{
    let testimonialsSection = document.querySelector('[data-testimonials]');
    if (testimonialsSection) {
        let list = testimonialsSection.querySelector('.testimonials-list');
        let listItems = testimonialsSection.querySelectorAll('.testimonials-list li');
        let btn = testimonialsSection.querySelector('.testimonials__mob-btn');
        let margin = 8;

        if (list && btn && listItems.length) {
            const toggleHideItems = () => {
                if (document.documentElement.clientWidth < 768 && !testimonialsSection.classList.contains('testimonials--showed')) {
                    listItems.forEach((item, index) => {
                        if (index > 1) {
                            item.classList.add('d-none')
                        }
                    })
                } else {
                    listItems.forEach(item => {
                        item.classList.remove('d-none')
                    })
                }
            }

            toggleHideItems();

            window.addEventListener('resize', toggleHideItems)


            btn.addEventListener('click', (e) => {
                e.preventDefault();
                listItems.forEach(item => {
                    item.classList.remove('d-none')
                })
                btn.style.display = 'none';
                testimonialsSection.classList.add('testimonials--showed')

            })
        }
    }

    let testimonialsListAll = document.querySelectorAll('[data-testimonials-list]');
    if (testimonialsListAll.length) {
        testimonialsListAll.forEach(testimonialsList => {
            let items = Array.from(testimonialsList.children);
            if (items.length > 9) {
                let btnWrap = document.createElement('div');
                btnWrap.className = 'testimonials-list-btn-wrap text-center'

                let btn = document.createElement('a');
                btn.className = 'btn btn--dark';
                btn.innerHTML = 'Показать еще отзывы';
                btnWrap.append(btn);

                testimonialsList.after(btnWrap);

                items.forEach((item, index) => {
                    if (index > 8) {
                        item.classList.add('d-none');
                    }
                })

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (testimonialsList.classList.contains('show-all-items')) {
                        testimonialsList.classList.remove('show-all-items');

                        items.forEach((item, index) => {
                            if (index > 8) {
                                item.classList.add('d-none');
                            }
                        })
                        btn.innerHTML = 'Показать еще отзывы';
                    } else {
                        testimonialsList.classList.add('show-all-items');

                        items.forEach((item) => {
                            item.classList.remove('d-none');
                        })

                        btn.innerHTML = 'Свернуть';
                    }

                })
            }
        })
    }
}