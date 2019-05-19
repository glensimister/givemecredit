async function listCandidates() {
    var isElected; //turn these vars into object
    let btnClass;
    let btnText;
    let items = [];
    items = await safe_listOfficials();
    if (items.length == 0) {
        $('.localOfficials').html("There are no officials to show");
    } else {
        items.forEach(async(item) => {
            if (item.value.elected) {
                isElected = 'elected';
                btnClass = 'btn-blue unelect';
                btnText = 'UNELECT';
            } else {
                isElected = 'notElected';
                btnClass = 'btn-red elect';
                btnText = 'ELECT';
            }
            var candidate = `<div id="${item.key}" class="${isElected}">
                  <i class="fa fa-fw fa-close delete-official"></i>
                  <div class="rateYo"></div>
                  <h4><a href="#/voting/html/profile?id=${item.key}&status=candidate">${item.value.name}</a></h4>
                  <p class="position">${item.value.position}</p>
                  <img src="${item.value.photo}" class="user-image-large animated rotateIn" alt="User Image">
                  <p>Approval rating: <b class="approval-rating">${item.value.approvalRating}</b></p>
                <p><button title="${item.key}" class="btn ${btnClass}">${btnText}</button></p>
                  <div class="grid-votes">
                      <div class="red"><i title="${item.key}" class="fa fa-thumbs-o-up"></i></div>
                      <div>${item.value.upVotes}</div>
                      <div class="blue"><i title="${item.key}" class="fa fa-thumbs-o-down"></i></div>
                      <div>${item.value.downVotes}</div>
                  </div>
              </div>`;
            if (!item.value.elected) {
                $('.localCandidates').append(candidate);
            } else if (item.value.elected) {
                $('.localOfficials').append(candidate);
            }
            $(".rateYo").rateYo({
                rating: item.value.approvalRating,
                starWidth: "20px",
                readOnly: true
            });
        });
    }
}
