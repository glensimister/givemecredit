import {listCandidates} from './listCandidates.js';

import {
    getDate
}
from '../general/getDate.js';

import {
    insertOfficial
}
from '../general/safenetwork.js';

export default (async function () {
    $(document.body).on("click", '.apply-for-position', function (e) {
        e.stopImmediatePropagation();
        $('#tab2').prop('checked', true);
        var position = $('.candidate-position').val();
        (async() => {
            let date = await getDate();
            const webId = await window.currentWebId["#me"]["@id"];
            const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
            const webIdName = await window.currentWebId["#me"]["name"];
            let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // this should be moved to a users table
            await insertOfficial(guid, {
                webID: webId,
                name: webIdName,
                photo: webIdImg,
                position: position,
                safeCoinAddr: "1BvBMSEYstWetqTFn5Au4m4GFg7xYstWetqTFn",
                elected: false,
                approvalRating: "0%",
                upVotes: 0,
                downVotes: 0,
                monthlyTarget: 200,
                creditsReceived: 0,
                percentageOfTarget: "0%", //maybe change this to number
                socialCredits: 0 //this will need to go in users table
            });
            listCandidates();
        })().catch(err => {
            console.error(err);
        });
    });
}());
