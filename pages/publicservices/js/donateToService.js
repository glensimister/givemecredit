(function ($) {
    $(document.body).on('click', '.donate-sc', async function (e) {
        e.stopImmediatePropagation();
        
        // get dom elements
        let input = $(this).parent().parent().find('input').val();
        let divId = $(this).attr("id");
        let raisedSoFar = $('#' + divId + ' .creditsReceived').html();
        
        input = parseFloat(input);
        let received = parseInt(raisedSoFar) + input;
        let progress = updateProgressBar(divId, input, raisedSoFar);
        let newSocialCreditVal = updateCreditsBar('.sc div', input);
        updateService(id, newSocialCreditVal, progress, received);
        
        /**** send the social credits to SafeCoin ****/
        let pubKey = $(this).attr("title");
        let balance = await safe_getBalance(pubKey);
        balance = balance + input;
        await safe_sendTo(pubKey, balance);
        
        /**** deduct social credits from donor ****/
        const webId = await window.currentWebId["@id"];
        await safe_deductSocialCredits(webId, newSocialCreditVal);

        function updateProgressBar(key, value, raised) {
            let newValue = parseInt(raised) + parseInt(value);
            $('#' + key + ' .creditsReceived').html(newValue);
            let monthlyTarget = $('#' + key + ' .monthlyTarget').html();
            let percentage = (parseInt(newValue) / parseInt(monthlyTarget)) * 100;
            let percentageString = percentage.toFixed(0) + "%";
            let progressBarDiv = $('#' + key + " .progress-bar > div");
            if (percentage <= 100) {
                progressBarDiv.css("width", percentageString);
            } else {
                progressBarDiv.css("width", "100%");
            }
            return percentageString;
        }

        function updateCreditsBar(type, amount) {
            var current_value = $(type).html();
            var new_value = (parseInt(current_value) - parseInt(amount));
            $(type).html(new_value.toFixed(0)).addClass('animated heartBeat');
            return new_value.toFixed(0);
        }

        async function updateService(key, socCred, prog, raised) {
            let items = [];
            items = await safe_listOfficials();
            items.forEach(async(item) => {
                if (item.key == key) {
                    item.value.percentageOfTarget = prog;
                    item.value.socialCredits = socCred;
                    item.value.creditsReceived = raised;
                    await safe_updateOffical(key, item.value, item.version);
                }
            });
        }
    });
})(jQuery);
