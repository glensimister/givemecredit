import {
    getDate
}
from './getDate.js';

import {
    insertItem, getItems, updateItem, deleteItems
}
from './safenetwork.js';

export async function status() {
    $(document.body).on('click', '.post-update button', function () {
        var update = $('.status-update input').val();
        updateStatus(update);
        $('.status-update input').val("");
    });

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
                let webID = $(this).next().find('webID');
                let date = await getDate();
                let post = editable.html();
                let edit = {
                    webID: webID,
                    date: date,
                    post: post
                }
                let id = $(this).attr('id');
                await updateItem(id, edit, 0);
                displayStatus();
            })().catch(err => {
                console.error(err);
            });
        }
    });

    $(document.body).on('click', '.delete-post', function () {
        (async() => {
            let id = $(this).next().attr('id');
            await deleteItems(id);
            displayStatus();
        })().catch(err => {
            console.error(err);
        });
    });

    $('.status-checkbox').on("click", function () {
        if ($(this).hasClass('checked')) {
            $(this).html('');
            $(this).removeClass('checked');
        } else {
            $(this).html('&#10004;');
            $(this).addClass('checked');
        }
    });

    async function updateStatus(post) {
        let date = await getDate();
        const webID = await window.currentWebId["#me"]["@id"];
        let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        await insertItem(guid, {
            webID: webID,
            date: date,
            post: post
        });
        displayStatus();
    };
}

export async function displayStatus() {
    $('.post-feed').html(""); // should receive live updates but now it just refreshes and reloads all posts
    const id = await window.currentWebId["#me"]["@id"];
    const img = await window.currentWebId["#me"]["image"]["@id"];
    const name = await window.currentWebId["#me"]["name"];
    let items = [];
    items = await getItems();
    if (items.length == 0) {
        $('.post-feed').html("There are no posts to show");
    } else {
        items.forEach(async(item) => {
            let template = `
                <div class="post">
                    <i class="fa fa-fw fa-close delete-post"></i>
                    <i id="${item.key}" class="fa fa-fw fa-pencil edit-post"></i>
                    <div class="post-body">
                    <img src="${img}" class="user-image-medium" alt="User Image">
                    <span><a class="webID" href="${id}">${name}</a><br /><span class="date">${item.value.date}</span></span>
                    <div class="post-desc">${item.value.post}</div></div>
                    <div class="grid-toolbar">
                        <div class="red"><i class="fa fa-thumbs-o-up"></i></div>
                        <div>90</div>
                        <div class="blue"><i class="fa fa-thumbs-o-down"></i></div>
                        <div>10</div>
                        <div class="red"><i class="fa fa-flag"></i></div>
                        <div>0</div>
                        <div class="rateYoToolbar"></div>
                        <div>
                            <select>
                                <option>Bitcoin</option>
                                <option>Crypto20</option>
                                <option>Dash</option>
                                <option>Ether</option>
                            </select>
                        </div>
                        <div><input type="number" placeholder="1"></div>
                        <div class="red"><i class="fa fa-heart"></i></div>
                    </div>
                     <div class="post-comment">
                    </div>
                    <input type="text" class="post-comment-input" placeholder="Write a comment..." />
                </div>`;
            $('.post-feed').prepend(template);
            $(".rateYoToolbar").rateYo({
                rating: 4,
                starWidth: "15px",
                readOnly: true
            });
        });
    }
}
