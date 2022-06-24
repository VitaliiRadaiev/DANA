let dataAdvantageSections = document.querySelectorAll('[data-advantage]');
if(dataAdvantageSections.length) {
    dataAdvantageSections.forEach(dataAdvantageSection => {
        let rows = dataAdvantageSection.querySelectorAll('.advantage__row');
        let textWrapAll = dataAdvantageSection.querySelectorAll('.advantage__text-wrap');
        
        if(rows.length) {
            rows.forEach(row => {
                let col1 = row.querySelector('.advantage__col--1');
                let col2 = row.querySelector('.advantage__col--2');
                let text1 = col1.querySelector('.advantage__text-wrap');
                let text2 = col2.querySelector('.advantage__text-wrap');


                col1.addEventListener('click', () => {
                    row.classList.remove('show-flaws');
                })
                col2.addEventListener('click', () => {
                    row.classList.add('show-flaws');
                })

                const setMinWidth = () => {
                    let widthValue = 0;
                    if(row.classList.contains('show-flaws')) {
                        widthValue = text2.parentElement.clientWidth;
                    } else {
                        widthValue = text1.parentElement.clientWidth;
                    }

                    if(document.documentElement.clientWidth > 992) {
                        return;
                    } else if(document.documentElement.clientWidth > 768) {
                        text1.style.minWidth = widthValue - 64 + 'px';
                        text2.style.minWidth = widthValue - 64 + 'px';
                    } else if(document.documentElement.clientWidth > 414) {
                        text1.style.minWidth = widthValue - 32 + 'px';
                        text2.style.minWidth = widthValue - 32 + 'px';
                    }
                }

                setMinWidth();

                window.addEventListener('resize', setMinWidth);
            })
        }
    })
}