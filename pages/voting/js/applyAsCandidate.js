(function ($) {
    $(document.body).on("click", '.apply-for-position', async function (e) {
        e.stopImmediatePropagation();
        distributeSocCredits(10); //10 is an arbitrary number. This will need to be based on the cost of a PUT request
        $('#tab2').prop('checked', true);
        var position = $('.candidate-position').val();
        let date = await getDate();        
        let pubKey = await safe_getUserPubKeyFromWebId(webId);
        let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        try {
            await safe_insertOfficial(guid, {
                pubKey: pubKey,
                webId: webId,
                name: webIdName,
                photo: webIdImg,
                position: position,
                elected: false,
                approvalRating: "0%",
                upVotes: 0,
                downVotes: 0,
                monthlyTarget: 200,
                creditsReceived: 0,
                percentageOfTarget: "0%", //maybe change this to number
            });
        } catch (err) {
            console.log(err);
        }
        listCandidates();
    });
})(jQuery);
