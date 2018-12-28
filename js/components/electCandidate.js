import {listCandidates} from './listCandidates.js';

export function electCandidate() {
    var totalVotes = 0;
    var percentage = 0;
    var upVotes = 0;
    var downVotes = 0;
    //need to make these styles more specific or they will clash with toolbar
    $(document.body).on("click", '.fa-thumbs-o-up, .fa-thumbs-o-down', function (e) {
        e.stopImmediatePropagation();
        var key = $(this).attr("title");
        var elem = $(this).parent().next('div');
        var votes = elem.html();
        votes++;
        elem.html(votes);

        if ($(this).hasClass('fa-thumbs-o-up')) {
            gun.get(key).path('upVotes').put(votes);
            upVotes++;
        } else if ($(this).hasClass('fa-thumbs-o-down')) {
            gun.get(key).path('downVotes').put(votes);
            downVotes++;
        }
        totalVotes = upVotes + downVotes;
        percentage = (upVotes / totalVotes) * 100;
        var percentageString = percentage.toFixed(0) + "%";
        gun.get(key).get('approvalRating').put(percentageString);
        $('div#' + key + ' .approval-rating').html(percentageString);
        $('div#' + key).find(".rateYo").rateYo("rating", percentageString);

        var position = $('div#' + key + ' .position').text();
        var name = $('div#' + key + ' h4 a').text();
        var isElected = $('div#' + key).hasClass('elected');

        if ((percentage >= 65) && !isElected) {
            gun.get(key).path('elected').put(true);
            gun.get('services').map().once(function (data, id) {
            if (data.owner === name) {
                gun.get(id).path('isElected').put(true, function(){
                    listCandidates();
                    $('.localCandidates').html("");
                });
            }
            });
            $('#tab1').prop('checked', true);
        } else if ((percentage < 65) && isElected) {
            gun.get(key).path('elected').put(false);
            gun.get('services').map().once(function (data, id) {
            if (data.owner === name) {
                gun.get(id).path('isElected').put(false, function(){
                    listCandidates();
                    $('.localOfficials').html("");
                });
            }
            });
            $('#tab2').prop('checked', true);
        }
    });
}
