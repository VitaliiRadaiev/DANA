{
    let portfolioCards = document.querySelectorAll('[data-portfolio-card]');
    if(portfolioCards.length) {
        portfolioCards.forEach(portfolioCard => {
            let col1 = portfolioCard.querySelector('.portfolio-card__col-1');
            let head = portfolioCard.querySelector('.portfolio-card__head');
            let review = portfolioCard.querySelector('.portfolio-card__review');

            const changePostion = () => {
                if(document.documentElement.clientWidth < 992) {
                    head.after(col1);
                } else {
                    portfolioCard.prepend(col1);
                }
            }

            const setMarginTop = () => {
                if(review) {
                    if(document.documentElement.clientWidth > 991.92) {
                        review.style.marginTop = -(review.clientHeight / 2) + 'px';
                    }
                }
            }
            setMarginTop();
            changePostion();

            window.addEventListener('resize', () => {
                setMarginTop();
                changePostion();
            });
        })
    }
}