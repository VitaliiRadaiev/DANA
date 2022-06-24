
let servicesQuestionsLists = document.querySelectorAll('[data-services-questions-list]');
if(servicesQuestionsLists.length) {
    servicesQuestionsLists.forEach(servicesQuestionsList => {
        let items = Array.from(servicesQuestionsList.children);
  
        if(items.length > 10) {
            
            let btnWrap = document.createElement('div');
            btnWrap.className = 'button-wrap button-wrap--bottom text-center'

            let btn = document.createElement('a');
            btn.className = 'btn btn--dark';
            btn.innerHTML = 'Показать все услуги';
            btnWrap.append(btn);

            servicesQuestionsList.after(btnWrap);

            items.forEach((item, index) => {
                if(index > 9) {
                    item.classList.add('d-none');
                }
            })

            btn.addEventListener('click', (e) => {
                e.preventDefault();

                if(servicesQuestionsList.classList.contains('show-all-items')) {
                    servicesQuestionsList.classList.remove('show-all-items');

                    items.forEach((item, index) => {
                        if(index > 9) {
                            item.classList.add('d-none');
                        }
                    })
                    btn.innerHTML = 'Показать все услуги';
                } else {
                    servicesQuestionsList.classList.add('show-all-items');
                    
                    items.forEach((item) => {
                        item.classList.remove('d-none');
                    })
                    
                    btn.innerHTML = 'Свернуть';
                }


            })
        }
    })
}