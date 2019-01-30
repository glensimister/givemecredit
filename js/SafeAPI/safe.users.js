let users;
async function createUsers(reset) {
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

async function isUserVerified(id) {
    let usrIsVerified = false;
    let users = [];
    users = await safeGetUsers();
    users.forEach(async(user) => {
        let str = id.localeCompare(user.value.webID);
        if (str == 0) {
            usrIsVerified = true;
        }     
    });
    return usrIsVerified;
}

async function createNewUser(id, img, name, safeCoinPubKey) {
    let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await insertUser(guid, {
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

async function insertUser(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await users.applyEntriesMutation(mutations);
}


async function deductSocialCredits(webId, newSocialCreditVal) {
    let users = [];
    users = await safeGetUsers();
    users.forEach(async(user) => {
        let str = webId.localeCompare(user.value.webID);
        if (str == 0) {
            user.value.socialCredits = newSocialCreditVal;
            updateUser(user.key, user.value, user.version);
            console.log('Social Credits Updated for ' + user.value.name);
        }
    });
}

/*** this is for testing purposes ***/
async function resetUserCredits() {
    let users = [];
    users = await safeGetUsers();
    users.forEach(async(user) => {
        user.value.socialCredits = 0;
        user.value.healthCredits = 0;
        user.value.educationCredits = 0;
        updateUser(user.key, user.value, user.version);
    });
}


async function updateUser(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await users.applyEntriesMutation(mutations);
    console.log('user updated');
}

async function deleteAllUsers() {
    let items = [];
    items = await safeGetUsers();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        await mutations.delete(item.key, item.version + 1);
    });
    await users.applyEntriesMutation(mutations);
}

async function safeGetUsers() {
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

async function getUserPubKeyFromWebId(webId) {
    let pubKey = "";
    let users = [];
    users = await safeGetUsers();
    users.forEach(async(user) => {
        let str = webId.localeCompare(user.value.webID);
        if (str == 0) {
            pubKey = user.value.pubKey;
        }
    });
    return pubKey;
}


/******* generate GUID from WEBID ********/

async function getUserIdFromWebId(webId) {
    let str = await safeApp.crypto.sha3Hash(webId).toString(16);
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}