function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

getScripts([
    "pages/publicservices/js/displayEdCreditsBox.js",
    "pages/publicservices/js/displayHealthCreditsBox.js",
    "pages/publicservices/js/displayPubService.js",
    "pages/publicservices/js/donateToService.js",
    "pages/publicservices/js/topUpCredits.js",
], function () {
    displayPubService();
});
