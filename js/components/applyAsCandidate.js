import {
    listCandidates
}
from './listCandidates.js';

import {
    getDate
}
from './getDate.js';

import {
    insertOfficial
}
from './safenetwork.js';

export async function applyAsCandidate() {
    $(document.body).on("click", '.apply-for-position', function (e) {
        e.stopImmediatePropagation();
        $('#tab2').prop('checked', true);
        var position = $('.candidate-position').val();

        (async() => {
            let date = await getDate();
            const webID = await window.currentWebId["#me"]["@id"];
            const img = await window.currentWebId["#me"]["image"]["@id"];
            const name = await window.currentWebId["#me"]["name"];
            let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await insertOfficial(guid, {
                webID: webID,
                name: name,
                photo: img,
                position: position,
                elected: false,
                approvalRating: "0%",
                upVotes: 0,
                downVotes: 0
            });
            listCandidates();
        })().catch(err => {
            console.error(err);
        });

        /* let id;
         gun.get('users').once(function (data) {
             gun.get('pub/' + data.pubKey).once(function (result) {
                 id = data.pubKey.split(/[.\-_]/);
                 var candidate = {
                     id: id[0],
                     name: result.name,
                     photo: result.photo,
                     position: position,
                     elected: false,
                     approvalRating: "0%",
                     upVotes: 0,
                     downVotes: 0
                 }
                 gun.get('candidates').set(candidate);
                 gun.get('services').set({
                     id: id[0],
                     service: position,
                     owner: result.name,
                     isElected: false,
                     creditsReceived: 0,
                     percentageOfTarget: "0%"
                 });
             });
         });*/
    });
}
