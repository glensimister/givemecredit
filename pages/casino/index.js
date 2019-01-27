function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

getScripts([
    "pages/casino/js/lottery.js",
    "pages/casino/js/slotMachine.js",
    "pages/casino/js/distributeSocCredits.js"], function () {
    lottery();
    slotMachine();
});
