{
    let frequentlyQuestions = document.querySelector('[data-frequently-questions]');
    if(frequentlyQuestions) {
        let btn = frequentlyQuestions.querySelector('.frequently-questions__see-more');
        let collpase = frequentlyQuestions.querySelector('.frequently-questions__list-collapse');
        let openText = btn.innerText;
        let closeText = btn.dataset.text;
        let cards = frequentlyQuestions.querySelectorAll('.frequently-questions-card');

        if(btn && collpase) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if(btn.classList.contains('content-show')) {
                    btn.classList.remove('content-show');
                    btn.innerText = openText;
                } else {
                    btn.classList.add('content-show');
                    btn.innerText = closeText;
                }

                this.utils.slideToggle(collpase)
            })
        }

        if(cards.length) {
            cards.forEach(card => {
                let textCollapse = card.querySelector('.frequently-questions-card__text-collapse');
                card.addEventListener('click', (e) => {
                    e.preventDefault();

                    if(textCollapse) {
                        card.classList.toggle('frequently-questions-card--is-open')
                        this.utils.slideToggle(textCollapse, 300);
                    }
                })
            })
        }
    }
}