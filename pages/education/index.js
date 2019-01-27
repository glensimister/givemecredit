function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

getScripts([
    "pages/education/js/course.js"
], function () {
    course();
});