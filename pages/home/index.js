function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}


getScripts([
    "pages/home/js/posts.js",
    "pages/home/js/AddComment.js",
    "pages/home/js/editComment.js",
    "pages/home/js/getComments.js",
    "pages/home/js/displayPosts.js",
    "pages/home/js/displayUserData.js",
    "pages/home/js/editPost.js"
], async function () {
    let date = await getDate();
    const id = await window.currentWebId["#me"]["@id"];
    const img = await window.currentWebId["#me"]["image"]["@id"];
    const name = await window.currentWebId["#me"]["name"];
    posts(date, id, img, name);
    AddComment(date, id, img, name);
    displayPosts();
});
