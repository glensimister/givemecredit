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
    "pages/home/js/comments.js",
    "pages/home/js/displayPosts.js",
    "pages/home/js/displayUserData.js"
], async function () {

    try {
        await displayUserData();
    } catch (err) {
        alert(err.message + ". Please make sure you have enabled experimental API and selected your webID.");
    }

    displayPosts();
});
