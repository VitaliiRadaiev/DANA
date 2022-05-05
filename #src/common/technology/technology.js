{
    let technologySection = document.querySelector('[data-technology]');
    if(technologySection) {
        let list = technologySection.querySelector('.technology__list');
        let listItems = technologySection.querySelectorAll('.technology__list li');
        let btn = technologySection.querySelector('.technology__bottom .btn');

        if(list && btn && listItems.length) {
            const setMaxHeight = () => {
                if(document.documentElement.clientWidth < 768) {
                    let height = listItems[0].clientHeight + 22;

                    if(listItems[1]) {
                        height += listItems[1].clientHeight + 22;
                    }
                    
                    list.style.maxHeight = height - 1 + 'px';
                }
            }

            setMaxHeight();

            window.addEventListener('resize', setMaxHeight);

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                list.style.maxHeight = list.scrollHeight + 22 + 'px';
                btn.style.display = 'none';
            })
        }
    }
}