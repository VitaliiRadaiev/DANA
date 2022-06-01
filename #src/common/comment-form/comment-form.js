{
    let commnetFormTextarea = document.querySelector('[data-comment-form] .textarea');
    let submit = document.querySelector('[data-comment-form] .comments__form-btn');
    if(commnetFormTextarea && submit) {
        commnetFormTextarea.addEventListener('input', () => {
            if(commnetFormTextarea.value.length) {
                submit.classList.remove('disabled');
            } else {
                submit.classList.add('disabled');
            }
        })
    }
}