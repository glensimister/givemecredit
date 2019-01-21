import {
    listCandidates
}
from './listCandidates.js';

import {
    updateOffical, listOfficials, deleteOfficial
}
from '../safenetwork.js';

export default (function () {
    
    $(document.body).on("click", '.delete-official', async function () {
        let id = $(this).parent().attr('id');
        await deleteOfficial(id);
        listCandidates();
    });
    
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
            (async() => { //remove this and put it in the click event
                let items = [];
                items = await listOfficials();
                items.forEach(async(item) => {
                    if (item.key == key) {
                        item.value.elected = true;
                        item.value.approvalRating = percentageString;
                        item.value.upVotes = upVotes;
                        item.value.downVotes = downVotes;
                        await updateOffical(key, item.value, item.version);
                        $('#tab1').prop('checked', true);
                        $('div#' + key).remove();
                        $('.localOfficials').html("");
                        listCandidates();
                    }
                });
            })().catch(err => {
                console.error(err);
            });
        } else
        if ((percentage < 65) && isElected) {
            (async() => {
                let items = [];
                items = await listOfficials();
                items.forEach(async(item) => {
                    if (item.key == key) {
                        item.value.elected = false;
                        item.value.approvalRating = percentageString;
                        item.value.upVotes = upVotes;
                        item.value.downVotes = downVotes;
                        await updateOffical(key, item.value, item.version);
                        $('#tab2').prop('checked', true);
                        $('div#' + key).remove();
                        $('.localCandidates').html("");
                        listCandidates();
                    }
                });
            })().catch(err => {
                console.error(err);
            });
        }
    });
}());
