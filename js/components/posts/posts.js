import {
    getDate
}
from '../getDate.js';

import {
    insertItem, getItems, updateItem, deleteItems
}
from '../safenetwork.js';

import {
    displayPosts
}
from './displayPosts.js';

export default (function () {

    $(document.body).on('click', '.post-update button', function () {
        var update = $('.status-update input').val();
        updatePost(update);
        $('.status-update input').val("");
    });

    async function updatePost(post) { //change name of this to postUpdate()
        let date = await getDate();
        const id = await window.currentWebId["#me"]["@id"];
        const img = await window.currentWebId["#me"]["image"]["@id"];
        const name = await window.currentWebId["#me"]["name"];
        let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await insertItem(guid, {
            webID: id,
            date: date,
            img: img,
            name: name,
            post: post
        });
        displayPosts();
    };

    $(document.body).on('click', '.edit-post', function () {
        let editable = $(this).next().find('.post-desc');
        if ($(this).hasClass('fa-pencil')) {
            $(this).removeClass('fa-pencil').addClass('fa-floppy-o');
            editable.attr('contenteditable', 'true');
            editable.css({
                border: "1px solid #dd4b39",
                padding: "20px"
            });
        } else {
            (async() => {
                $(this).removeClass('fa-floppy-o').addClass('fa-pencil');
                let id = $(this).attr('id');
                let post = editable.html();
                let items = [];
                items = await getItems();
                items.forEach(async(item) => {
                    if (item.key == id) {
                        item.value.post = post;
                        await updateItem(id, item.value, item.version);
                    }
                    editable.css({
                        border: "none",
                        padding: "0"
                    });
                });
            })().catch(err => {
                console.error(err);
            });
        }
    });

    $(document.body).on('click', '.delete-post', function () {
        (async() => {
            let id = $(this).next().attr('id');
            await deleteItems(id);
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
}());
