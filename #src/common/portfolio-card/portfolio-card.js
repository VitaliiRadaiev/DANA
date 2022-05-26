{
    let portfolioCards = document.querySelectorAll('[data-portfolio-card]');
    if(portfolioCards.length) {
        portfolioCards.forEach(portfolioCard => {
            let col1 = portfolioCard.querySelector('.portfolio-card__col-1');
            let head = portfolioCard.querySelector('.portfolio-card__head');

            const changePostion = () => {
                if(document.documentElement.clientWidth < 992) {
                    head.after(col1);
                } else {
                    portfolioCard.prepend(col1);
                }
            }

            changePostion();

            window.addEventListener('resize', changePostion);
        })
    }
}