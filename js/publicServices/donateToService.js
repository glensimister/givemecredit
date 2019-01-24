import {
    listOfficials, updateOffical
}
from '../general/safenetwork.js';

export default (async function () {
    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        let input = $(this).parent().parent().find('input').val();
        let id = $(this).attr("title");
        let raisedSoFar = $('#' + id + ' .creditsReceived').html();
        let received = parseInt(raisedSoFar) + parseInt(input);
        let progress = updateProgressBar(id, input, raisedSoFar);
        let newSocialCreditVal = updateCreditsBar('.sc div', input);
        updateService(id, newSocialCreditVal, progress, received);

        function updateProgressBar(key, value, raised) {
            $('#' + key + ' .creditsReceived').html(parseInt(raised) + parseInt(value));
            let monthlyTarget = $('#' + key + ' .monthlyTarget').html();
            let percentage = (parseInt(value) / parseInt(monthlyTarget)) * 100;
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
            $(type).html(new_value.toFixed(0));
            payRebate(amount);
            return new_value.toFixed(0);
        }

        function payRebate(amount) {
            var rebate = 10 / 100 * amount;
            var result = 0;
            result = $('.rebate div').text();
            result = rebate + parseInt(result);
            $('.rebate div').html(result.toFixed(0));
        }

        async function updateService(key, socCred, prog, raised) {
            let items = [];
            items = await listOfficials();
            items.forEach(async(item) => {
                if (item.key == key) {
                    item.value.percentageOfTarget = prog;
                    item.value.socialCredits = socCred;
                    item.value.creditsReceived = raised;
                    await updateOffical(key, item.value, item.version);
                }
            });
        }
    });
}());
