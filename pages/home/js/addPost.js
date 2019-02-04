async function addPost(date, id, img, name) {
    $(document.body).on('click', 'button.post-update', async function (e) {
        e.stopImmediatePropagation();
        let post = $('.status-update input').val();
        const graphId = `${id}/posts`;
        let postId = `${graphId}/${Math.round( Math.random() * 100000 )}`;
        await safe_insertPost(postId, {
            date: date,
            img: img,
            name: name,
            post: post
        });
        displayPosts();
        $('.status-update input').val("");
    });
}
