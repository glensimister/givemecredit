async function posts(date, id, img, name) {

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

    $(document.body).on('click', '.delete-post', async function () {
        let elemId = $(this).attr("data-type");
        await safeDeletePost(elemId);
        displayPosts();
    });

    $(document.body).on('click', '.delete-comment', async function () {
        let elemId = $(this).attr("data-type");
        await safeDeleteComment(elemId);
        displayPosts();
    });

    $(document.body).on("click", '.status-checkbox', function () {
        if ($(this).hasClass('checked')) {
            $(this).html('');
            $(this).removeClass('checked');
        } else {
            $(this).html('&#10004;');
            $(this).addClass('checked');
        }
    });
}
