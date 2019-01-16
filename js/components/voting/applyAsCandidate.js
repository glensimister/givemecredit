import {listCandidates} from './listCandidates.js';

import {
    getDate
}
from '../getDate.js';

import {
    insertOfficial
}
from '../safenetwork.js';

export default (async function () {
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
            // this should be moved to a users table
            await insertOfficial(guid, {
                webID: webID,
                name: name,
                photo: img,
                position: position,
                safeCoinAddr: "1BvBMSEYstWetqTFn5Au4m4GFg7xYstWetqTFn",
                elected: false,
                approvalRating: "0%",
                upVotes: 0,
                downVotes: 0,
                monthlyTarget: 200,
                creditsReceived: 0,
                percentageOfTarget: "0%", //maybe change this to number
                socialCredits: 0,
                healthCredits: 0,
                educationCredits: 0,
                rebate: 0
            });
            listCandidates();
        })().catch(err => {
            console.error(err);
        });
    });
}());
