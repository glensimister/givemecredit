var gun = Gun(); // move this into different file

var gunAPI = {
    applyAsCandidate: async function (name, position) {
            let rating = Math.floor(Math.random() * 100) + 1;
            rating = rating + "%";
            let randomPhoto = ["img/user1-128x128.jpg", "img/user3-128x128.jpg", "img/user5-128x128.jpg", "img/user7-128x128.jpg"];
            let i = Math.floor(Math.random() * 4);
            let candidates = gun.get('candidates');
            await candidates.set({
                name: name,
                photo: randomPhoto[i],
                position: position,
                rating: rating
            });
        },
        listCandidates: function () {
            gun.get('candidates').map().on(function (data) {
                let candidateSummary = `<div class="profile-summary">
                <div class="rateYo"></div>
                <h4><a href="#/profile">${data.name}</a></h4>
                <p class="position">${data.position}</p>
                <img src="${data.photo}" class="user-image-large" alt="User Image">
                <p>Approval rating: <b>${data.rating}</b></p>
                <button class="btn btn-red connect">CONNECT</button>
            </div>`;
                $('.localOfficials').append(candidateSummary);
                $(".rateYo").rateYo({
                    rating: data.rating,
                    starWidth: "15px",
                    readOnly: true
                });
            });
        }
}
