import {
    listCandidates
}
from './listCandidates.js';
import {
    updateOffical, listOfficials, getOfficalObj
}
from './safenetwork.js';

export function electCandidate() {
    var totalVotes = 0;
    var percentage = 0;
    var upVotes = 0;
    var downVotes = 0;
    $(document.body).on("click", '.fa-thumbs-o-up, .fa-thumbs-o-down', function (e) {
        e.stopImmediatePropagation();
        var key = $(this).attr("title");
        var elem = $(this).parent().next('div');
        var votes = elem.html();
        votes++;
        elem.html(votes);

        if ($(this).hasClass('fa-thumbs-o-up')) {
            upVotes++;
        } else if ($(this).hasClass('fa-thumbs-o-down')) {
            downVotes++;
        }
        totalVotes = upVotes + downVotes;
        percentage = (upVotes / totalVotes) * 100;
        var percentageString = percentage.toFixed(0) + "%";
        if (percentage < 65) {
            (async() => {
                let items = [];
                items = await listOfficials();
                items.forEach(async(item) => {
                    if (item.key == key) {
                        item.value.approvalRating = percentageString;
                        item.value.upVotes = upVotes;
                        item.value.downVotes = downVotes;
                        await updateOffical(key, item.value, 0);
                        listCandidates();
                    }
                });
            })().catch(err => {
                console.error(err);
            });
        }

        $('div#' + key + ' .approval-rating').html(percentageString);
        $('div#' + key).find(".rateYo").rateYo("rating", percentageString);

        var position = $('div#' + key + ' .position').text();
        var name = $('div#' + key + ' h4 a').text();
        var isElected = $('div#' + key).hasClass('elected');

        if ((percentage >= 65) && !isElected) {
            (async() => {
                let items = [];
                items = await listOfficials();
                items.forEach(async(item) => {
                    if (item.key == key) {
                        item.value.elected = true;
                        item.value.approvalRating = percentageString;
                        item.value.upVotes = upVotes;
                        item.value.downVotes = downVotes;
                        console.log(item.value);
                        await updateOffical(key, item.value, 0);
                        listCandidates();
                        $('#tab1').prop('checked', true);
                    }
                });
            })().catch(err => {
                console.error(err);
            });
        } else
        if ((percentage < 65) && isElected) {
            gun.get(key).path('elected').put(false, function () {
                listCandidates();
            });
            gun.get('services').map().once(function (data, id) {
                if (data.owner === name) {
                    gun.get(id).path('isElected').put(false);
                }
            });
            //$('#tab2').prop('checked', true);
        }
    });
}
