(function ($) {

    $(document.body).on("click", '.delete-official', async function () {
        let id = $(this).parent().attr('id');
        await safe_deleteOfficial(id);
        listCandidates();
    });

    var totalVotes = 0;
    var percentage = 0;
    var upVotes = 0;
    var downVotes = 0;
    $(document.body).on("click", '.fa-thumbs-o-up, .fa-thumbs-o-down', async function (e) {
        e.stopImmediatePropagation();
        //10 is an arbitrary number. This will need to be based on the cost of a PUT request. What about downvotes/updates? 
        distributeSocCredits(10);
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
            let items = [];
            items = await safe_listOfficials();
            items.forEach(async(item) => {
                let str = key.localeCompare(item.key);
                if (str == 0) {
                    item.value.approvalRating = percentageString;
                    item.value.upVotes = upVotes;
                    item.value.downVotes = downVotes;
                    await safe_updateOffical(key, item.value, 0);
                }
            });
        }

        $('div#' + key + ' .approval-rating').html(percentageString);
        $('div#' + key).find(".rateYo").rateYo("rating", percentageString);

        var position = $('div#' + key + ' .position').text();
        var name = $('div#' + key + ' h4 a').text();
        var isElected = $('div#' + key).hasClass('elected');

        if ((percentage >= 65) && !isElected) {
            let items = [];
            items = await safe_listOfficials();
            items.forEach(async(item) => {
                let str = key.localeCompare(item.key);
                if (str == 0) {
                    item.value.elected = true;
                    item.value.approvalRating = percentageString;
                    item.value.upVotes = upVotes;
                    item.value.downVotes = downVotes;
                    await safe_updateOffical(key, item.value, item.version);
                    $('#tab1').prop('checked', true);
                    $('div#' + key).remove();
                    $('.localOfficials, .localCandidates').html("");
                    listCandidates();
                }
            });
        } else
        if ((percentage < 65) && isElected) {
            let items = [];
            items = await safe_listOfficials();
            items.forEach(async(item) => {
                let str = key.localeCompare(item.key);
                if (str == 0) {
                    item.value.elected = false;
                    item.value.approvalRating = percentageString;
                    item.value.upVotes = upVotes;
                    item.value.downVotes = downVotes;
                    await safe_updateOffical(key, item.value, item.version);
                    $('#tab2').prop('checked', true);
                    $('div#' + key).remove();
                    $('.localOfficials, .localCandidates').html("");
                    listCandidates();
                }
            });
        }
    });
})(jQuery);
