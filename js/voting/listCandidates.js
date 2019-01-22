import {
    listOfficials
}
from '../general/safenetwork.js';

import './applyAsCandidate.js';
import './electCandidate.js';

export async function listCandidates() {
    var isElected;
    let items = [];
    items = await listOfficials();
    if (items.length == 0) {
        $('.localOfficials').html("There are no officials to show");
    } else {
        items.forEach(async(item) => {
            if (item.value.elected) {
                isElected = 'elected';
            } else {
                isElected = 'notElected';
            }
            var candidate = `<div id="${item.key}" class="${isElected} animated slideInUp">
                  <i class="fa fa-fw fa-close delete-official"></i>
                  <div class="rateYo"></div>
                  <h4><a href="#/voting/profile?id=${item.key}&status=candidate">${item.value.name}</a></h4>
                  <p class="position">${item.value.position}</p>
                  <img src="${item.value.photo}" class="user-image-large animated rotateIn" alt="User Image">
                  <p>Approval rating: <b class="approval-rating">${item.value.approvalRating}</b></p>
                  <div class="grid-votes">
                      <div class="red"><i title="${item.key}" class="fa fa-thumbs-o-up"></i></div>
                      <div>${item.value.upVotes}</div>
                      <div class="blue"><i title="${item.key}" class="fa fa-thumbs-o-down"></i></div>
                      <div>${item.value.downVotes}</div>
                  </div>
              </div>`;
            if (!item.value.elected) {
                //$('.localCandidates').hide().append(candidate).fadeIn('slow');
                $('.localCandidates').append(candidate);
            } else if (item.value.elected) {
                //$('.localOfficials').hide().append(candidate).fadeIn('slow');
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
