var gunAPI = {
    displayUserData: function () {
        gun.get('users').once(function (data) {
            if (data === undefined) {
                window.location.replace("login.html");
            } else {
                gun.get('pub/' + data.pubKey).once(function (result) {
                    $('.profile-summary h4#fullName').html(result.name);
                    $('.profile-summary img.user-image-large ').attr("src", result.photo);
                    $('.profile-pic-small').attr("src", result.photo);
                    //$('.profile-summary ul li a.voteWeight').html(result.voteWeight);
                    //$('.profile-summary ul li a.age').html(result.age);
                    //$('.profile-summary ul li a.edScore').html(result.educationScore);
                    //$('.profile-summary ul li a.socialRating').html(result.socialRating);
                    //$('.profile-summary ul li a.connections').html(result.connections);
                });
            }
        });
    },
    applyAsCandidate: function (position) {
        gun.get('users').once(function (data) {
            gun.get('pub/' + data.pubKey).once(function (result) {
                gun.get('candidates').set({ //this will actually be in users when in production
                    id: result.id,
                    name: result.name,
                    photo: result.photo,
                    position: position,
                    rating: "0%",
                    upVotes: 0,
                    downVotes: 0
                });
            });
        });
    },
    vote: function (candidateID) {
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
                        console.log(key);
                        //gun.get('joyhkri6VsuH6W5wiVoJ').put(null);
                    }
                    $('.localCandidates .candidate-' + id).remove();
                });


                /*  $('.candidate-' + id).remove();
                  $('.localOfficials').append(elected);
                  $(".rateYo").rateYo({
                      rating: percentageString,
                      starWidth: "20px",
                      readOnly: true
                  }); */
            } else {
                /* if (($('.candidate-' + id).hasClass('elected')) && (voteType === 'down')) {
                     $('.candidate-' + id).remove();
                     $('.localCandidates').append(unelected);
                     $(".rateYo").rateYo({
                         rating: percentageString,
                         starWidth: "20px",
                         readOnly: true
                     });
                 }*/
            }

            $('.candidate-' + id).find(".rateYo").rateYo("rating", percentageString);
        });
    },
    displayService: function () {
        gun.get('services').map().val(function (data) {
            var publicService = `<div id="${data.id}">
                <i class="fa fa-times delete"></i>
                <h3><a href="#/profile?id=${data.id}&status=official">${data.service}</a></h3>
                <ul class="funds-raised">
                    <li>
                        Official<b class="pull-right"><a href="#/profile?id=${data.id}&status=official">${data.owner}</a></b>
                    </li>
                    <li>
                        Monthly target<b class="pull-right">200 ACV</b>
                    </li>
                    <li>
                        Raised so far<b class="pull-right">120 ACV</b>
                    </li>
                </ul>
                <div class="progress-bar">
                    <div style="width: 60%;">
                    </div>
                </div>
                <select class="form-control">
                    <option>Social Credits</option>
                    <option>Health Credits</option>
                    <option>Education Credits</option>
                    <option>C20 - Crypto20 (Index Fund)</option>
                    <option>BTC - Bitcoin</option>
                    <option>ETH - Ethereum</option>
                    <option>LTC - Litecoin</option>
                    <option>DASH - Dash</option>
                </select>
                <br />
                <div class="grid-input-button">
                    <div><input type="text" class="form-control donate-input"></div>
                    <div><button type="button" class="donate-sc">DONATE</button></div>
                </div>
            </div>`;
            $('.localServices').prepend(publicService);
        });
    },
    listElected: function () {
        var count = 0;
        gun.get('elected').map().val(function (data) {
            count++;
            let candidateSummary = `<div class="official-${count}">
                <div class="rateYo"></div>
                <h4><a href="#/profile?id=${data.id}&status=official">${data.name}</a></h4>
                <p class="position">${data.position}</p>
                <img src="${data.photo}" class="user-image-large" alt="User Image">
                <p>Approval rating: <b>${data.rating}</b></p>
                <div class="grid-votes">
                    <div class="red"><i title="${data.id}" id="up-${count}" class="fa fa-thumbs-o-up"></i></div>
                    <div>${data.upVotes}</div>
                    <div class="blue"><i title="${data.id}" id="down-${count}" class="fa fa-thumbs-o-down"></i></div>
                    <div>${data.downVotes}</div>
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
        gun.get('candidates').map().val(function (data) {
            count++;
            let candidateSummary = `<div id="${data.id}" class="candidate-${count}">
                <div class="rateYo"></div>
                <h4><a href="#/profile?id=${data.id}&status=candidate">${data.name}</a></h4>
                <p class="position">${data.position}</p>
                <img src="${data.photo}" class="user-image-large" alt="User Image">
                <p>Approval rating: <b class="approval-rating">${data.rating}</b></p>
                <div class="grid-votes">
                    <div class="red"><i title="${data.id}" id="up-${count}" class="fa fa-thumbs-o-up"></i></div>
                    <div>0</div>
                    <div class="blue"><i title="${data.id}" id="down-${count}" class="fa fa-thumbs-o-down"></i></div>
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
    getProfile: function () {
        var id = getUrlVars()["id"];
        var status = getUrlVars()["status"];

        if (status === 'candidate') {
            gun.get('candidates').map().on(function (data) {
                if (data.id === id) {
                    $('.profile-summary h4').html(data.position);
                    $('.profile-summary img').attr("src", data.photo);
                    $('.profile-summary ul li a.fullname').html(data.name);
                    $('.profile-summary ul li a.approval-rating').html(data.rating);
                }
            });
        } else if (status === 'official') {
            gun.get('elected').map().on(function (data) {
                if (data.id === id) {
                    $('.profile-summary h4').html(data.position);
                    $('.profile-summary img').attr("src", data.photo);
                    $('.profile-summary ul li a.fullname').html(data.name);
                    $('.profile-summary ul li a.approval-rating').html(data.rating);
                }
            });
        }

        function getUrlVars() {
            var vars = [],
                hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }
    }
}
