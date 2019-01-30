let styleSheets = 
`<link rel="stylesheet" type="text/css" href="pages/casino/css/slotMachine.css">
<link rel="stylesheet" type="text/css" href="pages/casino/css/lottery.css">`;

$('head').append(styleSheets);

function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

getScripts([
    "pages/casino/js/roulette.js",
    "pages/casino/js/lottery.js",
    "pages/casino/js/slotMachine.js",
    "pages/casino/js/distributeSocCredits.js"], function () {
    console.log('casino scripts loaded');
});
