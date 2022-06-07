{
    let comments = document.querySelectorAll('.commentlist .comment');
    if(comments.length) {
        comments.forEach(comment => {
            let name = comment.querySelector(".comment-author .fn");
            let metaData = comment.querySelector('.comment-metadata');
            let likesButtonsWrap = comment.querySelector('.cld-like-dislike-wrap');
            let replyButton = comment.querySelector('.reply');

            if(name && metaData) {
                metaData.prepend(name);
            }

            if(likesButtonsWrap && replyButton) {
                likesButtonsWrap.prepend(replyButton);
            }
        })
    }
}