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
    const id = await window.currentWebId["#me"]["@id"];
    const img = await window.currentWebId["#me"]["image"]["@id"];
    const name = await window.currentWebId["#me"]["name"];
    addPost(date, id, img, name);
    addComment(date, id, img, name);
    displayPosts();

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
});
