export function listCandidates() {
    var count = 0;
    gun.get('candidates').map().val(function (data) {
        console.log(data);
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
}
