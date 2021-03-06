async function displayPosts() {
    $('.post-feed').html("");
    let comments = [];
    let posts = [];
    posts = await safe_getPosts();
    if (posts.length == 0) {
        $('.post-feed').html("There are no posts to show");
    } else {
        posts.forEach(async(item) => { 
            let key = item.key.toString().split("/");
            comments = await getComments(key[4]);
            let template = `
                <div id="${key[4]}" class="post">
                    <i data-type="${item.key}" class="fa fa-fw fa-close delete-post"></i>
                    <i data-type="${item.key}" class="fa fa-fw fa-pencil edit-post"></i>
                    <div class="post-body">
                    <img src="${item.value.img}" class="user-image-medium" alt="User Image">
                    <span><a class="webId" href="${item.key}">${item.value.name}</a><br /><span class="date">${item.value.date}</span></span>
                    <div class="post-desc">${item.value.post}</div></div>
                    <div class="grid-toolbar">
                        ${toolbar}
                    </div>
                    <div class="post-comment">
                        ${comments.join("")||''}
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
