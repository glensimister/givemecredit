export function listElected() {
    var count = 0;
    gun.get('elected').map().on(function (data) {
        count++;
        console.log(count);
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
}
