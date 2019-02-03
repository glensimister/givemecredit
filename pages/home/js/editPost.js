$(async function () {
    $(document.body).on('click', '.edit-post', async function (e) {
        e.stopImmediatePropagation();
        let editable = $(this).next().find('.post-desc');
        if ($(this).hasClass('fa-pencil')) {
            $(this).removeClass('fa-pencil').addClass('fa-floppy-o');
            editable.attr('contenteditable', 'true');
            editable.css({
                border: "1px solid #dd4b39",
                padding: "20px"
            });
        } else {
            $(this).removeClass('fa-floppy-o').addClass('fa-pencil');
            let elemId = $(this).attr('id');
            let post = editable.html();
            let items = [];
            items = await safeGetPosts();
            items.forEach(async(item) => {
                if (item.key == elemId) {
                    item.value.post = post;
                    await safeUpdatePost(item.key, item.value, item.version);
                }
                editable.css({
                    border: "none",
                    padding: "0"
                });
            });
        }
    });
});
