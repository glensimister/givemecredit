var gunAPI = {
    displayUserData: function () {
        gun.get('users').once(function (data) {
            if (data === undefined) {
                window.location.replace("login.html");
            } else {
                gun.get('pub/' + data.pubKey).once(function (result) {
                    $('.profile-summary h4#fullName').html(result.name);
                    $('.profile-summary img').attr("src", result.photo);
                    $('.profile-summary ul li a.voteWeight').html(result.voteWeight);
                    $('.profile-summary ul li a.age').html(result.age);
                    $('.profile-summary ul li a.edScore').html(result.educationScore);
                    $('.profile-summary ul li a.socialRating').html(result.socialRating);
                    $('.profile-summary ul li a.connections').html(result.connections);
                });
            }
        });
    },
    applyAsCandidate: function (position) {
        gun.get('users').once(function (data) {
            gun.get('pub/' + data.pubKey).once(function (result) {
                gun.get('candidates').set({
                    id: result.id,
                    name: result.name,
                    photo: result.photo,
                    position: position,
                    rating: "0%"
                });
            });
        });
    },
    vote: function (candidateID) {
        var upVotes = 0;
        var downVotes = 0;
        var percentage = 0;
        var totalVotes = 0;
        var elem = '';

        if ($("#" + candidateID).hasClass('fa-thumbs-o-up')) {
            elem = $("#" + candidateID).parent().next();
            upVotes = elem.html();
            upVotes++;
            elem.html(upVotes);
            gun.get('votes').put({
                upVotes: upVotes
            });
        } else if ($("#" + candidateID).hasClass('fa-thumbs-o-down')) {
            elem = $("#" + candidateID).parent().next();
            downVotes = elem.html();
            downVotes++;
            elem.html(downVotes);
            gun.get('votes').put({
                downVotes: downVotes
            });
        }

        var id = candidateID.split("-").pop();

        gun.get('votes').on(function (data) {
            if (data.upVotes === undefined)
                data.upVotes = 0;

            if (data.downVotes === undefined)
                data.downVotes = 0;

            totalVotes = data.upVotes + data.downVotes;
            percentage = (data.upVotes / totalVotes) * 100;
            var percentageString = percentage + "%";
            var html = $('.candidate-' + id).html();
            var elected = `<div class="candidate-${id} elected">${html}</div>`;
            var unelected = `<div class="candidate-${id}">${html}</div>`;

            if (percentage >= 65) {
                $('.candidate-' + id).remove();
                $('.localOfficials').append(elected);
                $(".rateYo").rateYo({
                    rating: percentageString,
                    starWidth: "20px",
                    readOnly: true
                });
            } else {
                if ($('.candidate-' + id).hasClass('elected')) {
                    $('.candidate-' + id).remove();
                    $('.localCandidates').append(unelected);
                    $(".rateYo").rateYo({
                        rating: percentageString,
                        starWidth: "20px",
                        readOnly: true
                    });
                }
            }

            $('.candidate-' + id).find(".rateYo").rateYo("rating", percentageString);
        });
    },
    electCandidate: function () {
        //to do
        console.log("candidate elected!");
    },
    listElected: function () {
        var count = 0;
        gun.get('elected').map().on(function (data) {
            count++;
            let candidateSummary = `<div class="official${count}">
                <div class="rateYo"></div>
                <h4><a href="#/profile">${data.name}</a></h4>
                <p class="position">${data.position}</p>
                <img src="${data.photo}" class="user-image-large" alt="User Image">
                <p>Approval rating: <b>${data.rating}</b></p>
                <div class="grid-votes">
                    <div class="red"><i class="fa fa-thumbs-o-up"></i></div>
                    <div>0</div>
                    <div class="blue"><i class="fa fa-thumbs-o-down"></i></div>
                    <div>0</div>
                </div>
            </div>`;
            $('.localOfficials').append(candidateSummary);
            $(".rateYo").rateYo({
                rating: data.rating,
                starWidth: "20px",
                readOnly: true
            });
        });
    },
    listCandidates: function () {
        var count = 0;
        gun.get('candidates').map().on(function (data) {
            count++;
            let candidateSummary = `<div class="candidate-${count}">
                <div class="rateYo"></div>
                <h4><a href="#/profile">${data.name}</a></h4>
                <p class="position">${data.position}</p>
                <img src="${data.photo}" class="user-image-large" alt="User Image">
                <p>Approval rating: <b>${data.rating}</b></p>
                <div class="grid-votes">
                    <div class="red"><i id="up-${count}" class="fa fa-thumbs-o-up"></i></div>
                    <div>0</div>
                    <div class="blue"><i id=down-${count} class="fa fa-thumbs-o-down"></i></div>
                    <div>0</div>
                </div>
            </div>`;
            $('.localCandidates').append(candidateSummary);
            $(".rateYo").rateYo({
                rating: data.rating,
                starWidth: "20px",
                readOnly: true
            });
        });
    },

}
