async function addComment(date, id, img, name) {
    $(document.body).on("keypress", '.post-comment-input', async function (e) {
        e.stopImmediatePropagation();
        let element = $(this);
        let elemId = element.parent().attr('id');
        let comment = $('#' + elemId + ' .post-comment-input').val();
        const graphId = `${id}/posts`;
        let postId = `${graphId}/${Math.round( Math.random() * 100000 )}`;

        if (e.which == 13 && comment != '') {
            await safeInsertComment(postId, {
                postId: elemId,
                img: img,
                name: name,
                post: comment,
                date: date
            });
            displayPosts();
        }
    });
}
