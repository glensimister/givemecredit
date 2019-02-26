var css = `<link rel="stylesheet" type="text/css" href="pages/home/css/home.css">`;
$('head').append(css);

function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

getScripts([
    "pages/home/js/addPost.js",
    "pages/home/js/addComment.js",
    "pages/home/js/editComment.js",
    "pages/home/js/editPost.js",
    "pages/home/js/getComments.js",
    "pages/home/js/displayPosts.js",
    "pages/home/js/displayUserData.js"
], async function () {
    let date = await getDate();
    addPost(date, webId, webIdImg, webIdName);
    addComment(date, webId, webIdImg, webIdName);
    displayPosts();

    $(document.body).on('click', '.delete-post', async function () {
        let elemId = $(this).attr("data-type");
        await safe_deletePost(elemId);
        displayPosts();
    });

    $(document.body).on('click', '.delete-comment', async function () {
        let elemId = $(this).attr("data-type");
        await safe_deleteComment(elemId);
        displayPosts();
    });
});
