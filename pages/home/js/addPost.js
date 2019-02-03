async function addPost(date, id, img, name) {

    $(document.body).on('click', '.post-update button', function (e) {
        e.stopImmediatePropagation();
        var update = $('.status-update input').val();
        updateStatus(update);
        $('.status-update input').val("");
    });

    async function updateStatus(post) {
        const graphId = `${id}/posts`;
        let postId = `${graphId}/${Math.round( Math.random() * 100000 )}`;
        //let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await safeInsertPost(postId, {
            date: date,
            img: img,
            name: name,
            post: post
        });
        displayPosts();
    };
}
