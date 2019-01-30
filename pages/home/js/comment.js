async function comment(date, id, img, name) {
    $(document.body).on("keypress", '.post-comment-input', async function (e) {
        e.stopImmediatePropagation();
        let element = $(this);
        let elemId = element.parent().attr('id');
        let comment = $('#' + elemId + ' .post-comment-input').val();
        if (e.which == 13 && comment != '') {
            let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const commentObj = {
                commentId: guid,
                webID: id,
                date: date,
                img: img,
                name: name,
                comment: comment
            };

            let items = [];
            items = await safeGetPosts();
            items.forEach(async(item) => {
                let str = elemId.localeCompare(item.key);
                if (str == 0) {
                    item.value.comments = commentObj;
                    //comments will need to go in their own dataset instead overwriting the existing comment
                    await safeUpdatePost(item.key, item.value, item.version);
                }
            });
            displayComment(img, name, comment, date, guid, element);
        }
    });
}
