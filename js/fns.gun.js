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
    vote: function ($this) {
        var upVotes = 0;
        var downVotes = 0;
        var percentage = 0;
        var totalVotes = 0;
        var elem = '';

        if ($this.hasClass('fa-thumbs-o-up')) {
            elem = $this.parent().next();
            upVotes = elem.html();
            upVotes++;
            elem.html(upVotes);
            gun.get('votes').put({
                upVotes: upVotes
            });
        } else if ($this.hasClass('fa-thumbs-o-down')) {
            elem = $this.parent().next();
            downVotes = elem.html();
            downVotes++;
            elem.html(downVotes);
            gun.get('votes').put({
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
            var percentageString = percentage + "%";
            var candidateSummary = $this.parent().parent().parent();

            var isElected = false;

            if (percentage >= 65) {
                $(candidateSummary).addClass('elected');
                $('.localOfficials').append(candidateSummary);
                $(".rateYo").rateYo({
                    rating: percentageString,
                    starWidth: "20px",
                    readOnly: true
                });
            } else {
                if ($(candidateSummary).hasClass('elected')) {
                    $(candidateSummary).removeClass('elected');
                    $('.localCandidates').append(candidateSummary);
                    $(".rateYo").rateYo({
                        rating: percentageString,
                        starWidth: "20px",
                        readOnly: true
                    });
                }
            }

            $this.parent().parent().parent().find(".rateYo").rateYo("rating", percentageString);
        });
        //var rating = $this.parent().parent().parent().find(".rateYo").rateYo("rating");
    },
    electCandidate: function () {
        //to do
        console.log("candidate elected!");
    },
    listElected: function () {
        gun.get('elected').map().on(function (data) {
            let candidateSummary = `<div>
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
        gun.get('candidates').map().on(function (data) {
            let candidateSummary = `<div>
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
            $('.localCandidates').append(candidateSummary);
            $(".rateYo").rateYo({
                rating: data.rating,
                starWidth: "20px",
                readOnly: true
            });
        });
    },

}
