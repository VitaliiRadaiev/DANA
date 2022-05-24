{
    let quiz = document.querySelector('[data-quiz]');
    if(quiz ) {
        let triggers = quiz.querySelectorAll('[data-quiz-trigger]');
        let contents = Array.from(quiz.querySelectorAll('[data-quiz-content]'));
        let buttonsBack = quiz.querySelectorAll('.quiz__btn-back');

        if(triggers.length && contents.length) {
            triggers.forEach(trigger => {
                let [content] = contents.filter(content => content.dataset.quizContent === trigger.dataset.quizTrigger);
                trigger.addEventListener('click', () => {
                    trigger.classList.add('active');
                    if(content) {
                        content.classList.add('active');
                    }

                    triggers.forEach(i => {
                        if(i === trigger) return;

                        let [content] = contents.filter(content => content.dataset.quizContent === i.dataset.quizTrigger);
                        i.classList.remove('active');
                        content.classList.remove('active');
                    })

                    quiz.classList.add('quiz--show-content');
                })
            })
        }

        if(buttonsBack.length) {
            buttonsBack.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    quiz.classList.remove('quiz--show-content');
                })
            })
        }
    }
}