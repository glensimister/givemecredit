let users;
async function safe_createUsers(reset) {
    console.log("Creating users table...");
    try {
        const hash = await safeApp.crypto.sha3Hash('USERS_DATASET');
        users = await safeApp.mutableData.newPublic(hash, 15000); 
        if (reset){
           await users.quickSetup();  
        }
    } catch (err) {
        console.log(err);
    }
}

async function safe_isUserVerified(id) {
    let usrIsVerified = false;
    let users = [];
    users = await safe_getUsers();
    users.forEach(async(user) => {
        let str = id.localeCompare(user.value.webID);
        if (str == 0) {
            usrIsVerified = true;
        }     
    });
    return usrIsVerified;
}

async function safe_createNewUser(id, img, name, safeCoinPubKey) {
    let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await safe_insertUser(guid, {
        webID: id,
        photo: img,
        name: name,
        country: 'UK',
        postCode: 'TQ10XYZ',
        socialCredits: 0,
        healthCredits: 0,
        educationCredits: 0,
        pubKey: safeCoinPubKey
    });
    console.log('user created');
}

async function safe_insertUser(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await users.applyEntriesMutation(mutations);
}


async function safe_deductSocialCredits(webId, newSocialCreditVal) {
    let users = [];
    users = await safe_getUsers();
    users.forEach(async(user) => {
        let str = webId.localeCompare(user.value.webID);
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
}

/*** this is for testing purposes ***/
async function safe_resetUserCredits() {
    let users = [];
    users = await safe_getUsers();
    users.forEach(async(user) => {
        user.value.socialCredits = 0;
        user.value.healthCredits = 0;
        user.value.educationCredits = 0;
        safe_updateUser(user.key, user.value, user.version);
    });
}


async function safe_updateUser(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await users.applyEntriesMutation(mutations);
    console.log('user updated');
}

async function safe_deleteAllUsers() {
    let items = [];
    items = await safe_getUsers();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        await mutations.delete(item.key, item.version + 1);
    });
    await users.applyEntriesMutation(mutations);
}

async function safe_getUsers() {
    const entries = await users.getEntries();
    const entriesList = await entries.listEntries();
    const items = [];
    entriesList.forEach((entry) => {
        const value = entry.value;
        if (value.buf.length == 0) return;
        const parsedValue = JSON.parse(value.buf);
        items.push({
            key: entry.key,
            value: parsedValue,
            version: value.version
        });
    });
    return items;
}

/***** get users public key from webId *****/

async function safe_getUserPubKeyFromWebId(webId) {
    let pubKey = "";
    let users = [];
    users = await safe_getUsers();
    users.forEach(async(user) => {
        let str = webId.localeCompare(user.value.webID);
        if (str == 0) {
            pubKey = user.value.pubKey;
        }
    });
    return pubKey;
}


/******* generate GUID from WEBID - probably don't need this anymore ********/

async function safe_getUserIdFromWebId(webId) {
    let str = await safeApp.crypto.sha3Hash(webId).toString(16);
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}