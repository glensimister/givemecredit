export function listCandidates() {
    $('.localCandidates, .localOfficials').html("");
    var isElected;
    gun.get('candidates').map().val(function (data, key) {
        if (data.elected) {
            isElected = 'elected';
        } else {
            isElected = 'notElected';
        }
        var candidate = `<div id="${key}" class="${isElected}">
                <div class="rateYo"></div>
                <h4><a href="#/profile?id=${data.id}&status=candidate">${data.name}</a></h4>
                <p class="position">${data.position}</p>
                <img src="${data.photo}" class="user-image-large" alt="User Image">
                <p>Approval rating: <b class="approval-rating">${data.approvalRating}</b></p>
                <div class="grid-votes">
                    <div class="red"><i title="${key}" class="fa fa-thumbs-o-up"></i></div>
                    <div>${data.upVotes}</div>
                    <div class="blue"><i title="${key}" class="fa fa-thumbs-o-down"></i></div>
                    <div>${data.downVotes}</div>
                </div>
            </div>`;
        if (!data.elected) {
            $('.localCandidates').append(candidate);
        } else if (data.elected) {
            $('.localOfficials').append(candidate);
        }
        $(".rateYo").rateYo({
            rating: data.approvalRating,
            starWidth: "20px",
            readOnly: true
        });
    });
}
