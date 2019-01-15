import {
    listOfficials, updateOffical
}
from '../safenetwork.js';

export async function donateToService() {
    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        let input = $(this).parent().parent().find('input').val();
        let id = $(this).attr("title");
        let raisedSoFar = $('#' + id + ' .creditsReceived').html();
        let received = parseInt(raisedSoFar) + parseInt(input);
        let progress = updateProgressBar(id, input, raisedSoFar);
        let newSocialCreditVal = updateCreditsBar('.sc', input);
        updateService(id, newSocialCreditVal, progress, received);

        function updateProgressBar(key, value, raised) {
            $('#' + key + ' .creditsReceived').html(parseInt(raised) + parseInt(value));
            let monthlyTarget = $('#' + key + ' .monthlyTarget').html();
            let percentage = (parseInt(value) / parseInt(monthlyTarget)) * 100;
            let percentageString = percentage.toFixed(0) + "%";
            $('#' + key + " .progress-bar > div").css("width", percentageString);
            return percentageString;
        }

        function updateCreditsBar(type, amount) {
            var current_value = $(type).html();
            var new_value = (parseInt(current_value) - parseInt(amount));
            $(type).html(new_value.toFixed(0));
            return new_value.toFixed(0);
        }

        async function updateService(key, socCred, prog, raised) {
            let items = [];
            items = await listOfficials();
            items.forEach(async(item) => {
                if (item.key == key) {
                    item.value.percentageOfTarget = prog;
                    item.value.socialCredits = socCred;
                    item.value.creditsReceived = raised;
                }
                await updateOffical(key, item.value, item.version);
            });
        }

        /*    webID: webID,
            name: name,
            photo: img,
            position: position,
            safeCoinAddr: "1BvBMSEYstWetqTFn5Au4m4GFg7xYstWetqTFn",
            elected: false,
            approvalRating: "0%",
            upVotes: 0,
            downVotes: 0,
            monthlyTarget: 200,
            creditsReceived: 0,
            percentageOfTarget: "0%", //maybe change this to number
            socialCredits: 0,
            healthCredits: 0,
            educationCredits: 0,
            rebate: 0 */


        //var usrID = $(this).attr('title');
        //var serviceKey = $(this).attr('id');
        //deductCredits('.sc', input, usrID, serviceKey);
    });
}

/*
        function deductCredits(type, amount, usrID, serviceKey) {
            var current_value = $(type).html();
            var new_value = (parseInt(current_value) - parseInt(amount));
            $(type).html(new_value.toFixed(0));
            //maybe move the code below to somewhere else
            var percentage;
            gun.get('services').map().val(function (data, key) {
                if (usrID === data.id && key === serviceKey) {
                    var creditsReceived = parseInt(data.creditsReceived) + parseInt(amount);
                    gun.get(key).get('creditsReceived').put(creditsReceived);
                    $('#' + key + ' .creditsReceived').html(creditsReceived);
                    var monthlyTarget = $('#' + key + ' .monthlyTarget').html();
                    var progress = parseInt(monthlyTarget) + creditsReceived;
                    percentage = (parseInt(creditsReceived) / parseInt(monthlyTarget)) * 100;
                    var percentageString = percentage.toFixed(0) + "%";
                    gun.get(key).get('percentageOfTarget').put(percentageString);
                    if (percentage <= 100) {
                        $('#' + key + " .progress-bar > div").css("width", percentageString);
                    } else {
                        $('#' + key + " .progress-bar > div").css("width", "100%");
                    }
                }
            });
            payRebate(amount);
        }

        function payRebate(amount) {
            var rebate = 10 / 100 * amount;
            var result = 0;
            result = $('.rebate').text();
            result = rebate + parseInt(result);
            $('.rebate').html(result.toFixed(0));
        }
    });
}*/
