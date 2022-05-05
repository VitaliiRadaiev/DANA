{
    let quiz = document.querySelector('[data-quiz]');
    let quizButtons = document.querySelector('[data-quiz-buttons]');
    if(quiz && quizButtons) {
        let radioButtons = quiz.querySelectorAll('.quiz-card__radio');
        let submitButton = quizButtons.querySelector('.quiz__submit');
        let switches = quizButtons.querySelectorAll('[data-slide-to]');
        let wrapper = quiz.querySelector('.swiper-wrapper');

        let sliderQuiz = new Swiper(quiz, {
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 600,
            touchRatio: 0,
            on: {

            }
        });

        let sliderQuizButtons = new Swiper(quizButtons, {
            effect: 'fade',
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 600,
            touchRatio: 0,
            autoHeight: true,
            on: {

            }
        });

        
        sliderQuiz.controller.control = sliderQuizButtons;

        if(radioButtons.length && switches.length) {
            radioButtons.forEach(radioButton => {
                radioButton.addEventListener('change', () => {
                    switches.forEach(switcher => {
                        switcher.removeAttribute('disabled');
                    })
                })
            })
        }

        if(switches.length) {
            switches.forEach(switcher => {
                switcher.addEventListener('click', (e) => {
                    e.preventDefault();
                    sliderQuiz.slideTo(+switcher.dataset.slideTo);
                })
            })
        }

        window.quiz = {
            showResult() {
                sliderQuiz.slideTo(wrapper.children.length - 1);
                quiz.classList.remove('show-loader');
            }
        }

        if(submitButton) {
            submitButton.addEventListener('click', () => {
                quiz.classList.add('show-loader');
            })
        }
    }
}