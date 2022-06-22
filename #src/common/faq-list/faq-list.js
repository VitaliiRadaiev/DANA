{
    let faqList = document.querySelector('[data-faq-list]');
    if(faqList) {
        let items = Array.from(faqList.children);

        if(items.length) {
            items.forEach(item => {
                let previewText = item.querySelector('.faq-list__preview-text');
                let collapsedText = item.querySelector('.faq-list__collaps');
                let title = item.querySelector('.faq-list__title');
                let btn = item.querySelector('.faq-list__btn');
                let btnText = btn.innerHTML;

                if(btn) {

                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if(item.classList.contains('text-is-show')) {
                            item.classList.remove('text-is-show');
                            btn.innerHTML = btnText;
                            this.utils.slideDown(previewText, 200);
                            this.utils.slideUp(collapsedText, 400);
                        } else {
                            item.classList.add('text-is-show');
                            btn.innerHTML = btn.dataset.text;
                            this.utils.slideUp(previewText, 200);
                            this.utils.slideDown(collapsedText, 400);
                        }
                    })
                }

                
                title.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(item.classList.contains('text-is-show')) {
                        item.classList.remove('text-is-show');
                        if(previewText) this.utils.slideDown(previewText, 200);
                        this.utils.slideUp(collapsedText, 400);

                        if(btn) btn.innerHTML = btnText;
                    } else {
                        item.classList.add('text-is-show');
                        if(previewText) this.utils.slideUp(previewText, 200);
                        this.utils.slideDown(collapsedText, 400);

                        if(btn) btn.innerHTML = btn.dataset.text;
                    }
                })
            })
        }
    }
}