function getScripts(scripts, callback) {
    var progress = 0;
    scripts.forEach(function (script) {
        $.getScript(script, function () {
            if (++progress == scripts.length) callback();
        });
    });
}

getScripts([
    "pages/voting/js/applyAsCandidate.js",
    "pages/voting/js/displayOfficialProfile.js",
    "pages/voting/js/electCandidate.js",
    "pages/voting/js/listCandidates.js", ], async function () {
    listCandidates();
    displayOfficialProfile();
    let pubKey = await safe_getUserPubKeyFromWebId(webId);
    $('.safeCoinPubKey').val(pubKey);
});
