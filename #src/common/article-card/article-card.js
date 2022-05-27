{
    let articleCards = document.querySelectorAll('[data-article-card]');
    if(articleCards.length) {
        articleCards.forEach(articleCard => {
            let title = articleCard.querySelector('.article-card__titel');
            let ratingParent = articleCard.querySelector('.article-card__mera-row-2');
            let rating = articleCard.querySelector('.rating');
            let reviewsParent = articleCard.querySelector('.article-card__mera-row-1');
            let reviews = articleCard.querySelector('.article-card__reviews');
            let metaList = articleCard.querySelector('.article-card__meta-list');

            const changePosition = () => {
                if(document.documentElement.clientWidth < 768) {
                    title.after(rating);
                    metaList.after(reviews);
                } else {
                    ratingParent.append(rating);
                    reviewsParent.prepend(reviews);
                }   
            }

            changePosition();

            window.addEventListener('resize', changePosition);
        })
    }
}