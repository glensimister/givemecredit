export function vote() {
    $(document.body).on("click", '.fa-thumbs-o-up, .fa-thumbs-o-down', function (e) {
        e.stopImmediatePropagation();
        var candidateID = $(this).attr("id");
        var res = candidateID.split("-");
        var voteType = res[0]; //up or down
        var id = res[1];
        var upVotes = 0;
        var downVotes = 0;
        var percentage = 0;
        var totalVotes = 0;
        var elem = $("#" + candidateID).parent().next();
        var userID = $("#" + candidateID).attr('title');

        if (voteType === 'up') {
            upVotes = elem.html();
            upVotes++;
            elem.html(upVotes);
            gun.get('votes').put({
                id: userID,
                upVotes: upVotes
            });
        } else if (voteType === 'down') {
            downVotes = elem.html();
            downVotes++;
            elem.html(downVotes);
            gun.get('votes').put({
                id: userID,
                downVotes: downVotes
            });
        }

        gun.get('votes').on(function (data) {
            if (data.upVotes === undefined)
                data.upVotes = 0;

            if (data.downVotes === undefined)
                data.downVotes = 0;

            totalVotes = data.upVotes + data.downVotes;
            percentage = (data.upVotes / totalVotes) * 100;
            var percentageString = percentage.toFixed(0) + "%";
            var html = $('.candidate-' + id).html();
            var elected = `<div class="candidate-${id} elected">${html}</div>`;
            var unelected = `<div class="candidate-${id}">${html}</div>`;

            $('.approval-rating').html(percentageString);

            if ((percentage >= 65) && (voteType === 'up')) {
                gun.get('candidates').map().once(function (res, key) {
                    if (res.id === userID) {
                        var profile = {
                            id: res.id,
                            name: res.name,
                            photo: res.photo,
                            position: res.position,
                            rating: percentageString,
                            upVotes: data.upVotes,
                            downVotes: data.downVotes
                        };
                        gun.get('elected').set(profile);
                        gun.get('services').set({
                            id: res.id,
                            service: res.position,
                            owner: res.name
                        });
                        //gun.get('joyhkri6VsuH6W5wiVoJ').put(null);
                    }
                    $('.localCandidates .candidate-' + id).remove();
                });
            }

            $('.candidate-' + id).find(".rateYo").rateYo("rating", percentageString);
        });
    });
}
