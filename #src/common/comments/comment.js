{
    let comments = document.querySelectorAll('.commentlist .comment');
    if(comments.length) {
        comments.forEach(comment => {
            let author = comment.querySelector(".comment-author");
            let name = comment.querySelector(".comment-author .fn");
            let metaData = comment.querySelector('.commentmetadata');
            let likesButtonsWrap = comment.querySelector('.cld-like-dislike-wrap');
            let replyButton = comment.querySelector('.reply');

            if(name && metaData) {
                metaData.prepend(name);
            }

            if(likesButtonsWrap && replyButton) {
                likesButtonsWrap.prepend(replyButton);
            }

            if(author && metaData) {
                let authorWrap = document.createElement('div');
                authorWrap.className = 'comment-author-wrap';
                author.after(authorWrap);

                authorWrap.append(author);
                authorWrap.append(metaData);
            }
        })
    }
}