async function getComments(postId) {
    let array = [];
    let comments = [];
    comments = await safe_getComments();
    comments.forEach(async(comment) => {
        let str = postId.toString().localeCompare(comment.value.postId);
        if (str == 0) {
            let key = comment.key.toString().split("/");
            let template = `<div id="${key[4]}" class="comment-box">
                    <i data-type="${comment.key}" class="fa fa-fw fa-close delete-comment"></i>
                    <i data-type="${comment.key}" class="fa fa-fw fa-pencil edit-comment"></i>
                        <div class="post-body">
                            <img src="${comment.value.img}" class="user-image-medium" alt="User Image">
                            <span><a href="">${comment.value.name}</a><br />${comment.value.date}</span>
                            <div class="comment">${comment.value.post}</div>
                        </div>
                    <div class="grid-toolbar">
                        ${toolbar}
                    </div>
                    </div>`;
            array.push(template);
        }
    });
    return array;
}
