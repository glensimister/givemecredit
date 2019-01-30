async function displayPosts() {
    $('.post-feed').html(""); // should receive live updates but now it just refreshes and reloads all posts
    let comment;
    let posts = [];
    posts = await safeGetPosts();
    if (posts.length == 0) {
        $('.post-feed').html("There are no posts to show");
    } else {
        posts.forEach(async(item) => {
            if (item.value.comments !== null) {
                    comment = `<div id="${item.value.comments.commentId}" class="comment-box">
                    <i class="fa fa-fw fa-close delete-post"></i>
                    <i id="${item.value.comments.commentId}" class="fa fa-fw fa-pencil edit-post"></i>
                        <div class="post-body">
                            <img src="${item.value.comments.img}" class="user-image-medium" alt="User Image">
                            <span><a href="">${item.value.comments.name}</a><br />${item.value.comments.date}</span>
                            <div class="comment">${item.value.comments.comment}</div>
                        </div>
                        <div class="grid-toolbar">
                            <div class="red"><i title="${item.value.comments.commentId}" class="fa fa-thumbs-o-up"></i></div>
                            <div>90</div>
                            <div class="blue"><i title="${item.value.comments.commentId}" class="fa fa-thumbs-o-down"></i></div>
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
                    </div>`;
            } else {
                comment = "";
            }

            
            let template = `
                <div id="${item.key}" class="post">
                    <i class="fa fa-fw fa-close delete-post"></i>
                    <i id="${item.key}" class="fa fa-fw fa-pencil edit-post"></i>
                    <div class="post-body">
                    <img src="${item.value.img}" class="user-image-medium" alt="User Image">
                    <span><a class="webID" href="${item.value.id}">${item.value.name}</a><br /><span class="date">${item.value.date}</span></span>
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
                        ${comment}
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
