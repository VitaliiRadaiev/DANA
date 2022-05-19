{
    let testimonialCards = document.querySelectorAll('[data-testimonial-card]');
    if(testimonialCards.length) {
        testimonialCards.forEach(testimonialCard => {
            let text = testimonialCard.querySelector('.testimonial-card__text');
            let stringLength = 151;
            let str = text.innerText;

			if (str.length <= stringLength) return;
			text.innerText = [...str].slice(0, stringLength).join('') + '...';

            text.insertAdjacentHTML('beforeend', '<br> <a href="#" class="testimonial-card__read-more">Читать полностью</a>');

            let btn = testimonialCard.querySelector('.testimonial-card__read-more');
            if(btn) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    text.innerHTML = str;
                })
            }
        })
    }
}