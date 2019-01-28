(async function ($) {

    let date = await getDate();
    const id = await window.currentWebId["@id"];
    const img = await window.currentWebId["#me"]["image"]["@id"];
    const name = await window.currentWebId["#me"]["name"];

    $(document.body).on('click', '.post-update button', function (e) {
        e.stopImmediatePropagation();
        var update = $('.status-update input').val();
        updatePost(update);
        $('.status-update input').val("");
    });
    
        $(document.body).on("keypress", '.post-comment-input', async function (e) {
            e.stopImmediatePropagation();
            let element = $(this);
            let elemId = element.parent().attr('id');
            let comment = $('#' + elemId + ' .post-comment-input').val();
            if (e.which == 13 && comment != '') {
                let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                const commentObj = 
                    {
                        commentId: guid,
                        webID: id,
                        date: date,
                        img: img,
                        name: name,
                        comment: comment
                    };
                
                let items = [];
                items = await getItems();
                items.forEach(async(item) => {
                    let str = elemId.localeCompare(item.key);
                    if (str == 0) {     
                        item.value.comments = commentObj;
                        //comments will need to go in their own dataset instead overwriting the existing comment
                        await updateItem(item.key, item.value, item.version);
                    }
                });
                displayComment(img, name, comment, date, guid, element);
            }
        });

    async function updatePost(post) { //change name of this to postUpdate()
        let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await insertItem(guid, {
            webID: id,
            date: date,
            img: img,
            name: name,
            post: post,
            comments: null
        });
        displayPosts();
    };
    
    $(document.body).on('click', '.edit-post', async function () {
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
            items = await getItems();
            items.forEach(async(item) => {
                if (item.key == elemId) {
                    item.value.post = post;
                    await updateItem(item.key, item.value, item.version);
                }
                editable.css({
                    border: "none",
                    padding: "0"
                });
            });
        }
    });

    $(document.body).on('click', '.delete-post', function () {
        (async() => {
            let elemId = $(this).next().attr('id');
            await deleteItems(elemId);
            displayPosts();
        })().catch(err => {
            console.error(err);
        });
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
})(jQuery);
