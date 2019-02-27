async function deductSocialCredits(newSocialCreditVal) {
    let users = [];
    users = await safe_getUsers();
    users.forEach(async(user) => {
        let str = webId.localeCompare(user.value.webId);
        if (str == 0) {
            user.value.socialCredits = newSocialCreditVal;
            safe_updateUser(user.key, user.value, user.version);
            console.log('Social Credits Updated for ' + user.value.name);
        }
    });
}

// this function will be used by most events that perform POST requests
// e.g. voting, posting updates, and anything else we want to charge users for.

async function distributeSocCredits(credits) {
    let current_val = $('.sc div').html();
    let users = [];
    users = await safe_getUsers();
    let share = (credits / users.length);
    let new_val = (parseFloat(share) + parseFloat(current_val));
    $('.sc div').html(new_val.toFixed(2)).addClass('animated heartBeat');
    users.forEach(async(user) => {
        user.value.socialCredits = parseFloat(user.value.socialCredits) + parseFloat(share);
        await safe_updateUser(user.key, user.value, user.version);
    });
    let pubKey = await safe_getUserPubKeyFromWebId(webId);
    safe_sendFrom(pubKey, credits, function(result){
        $('.rebate div').html(result);
    });
}
