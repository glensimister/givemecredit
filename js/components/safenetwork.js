let safeApp;
export async function authoriseAndConnect() {
    let appInfo = {
        name: 'DEVOLUTION',
        id: 'net.devolution.web-app',
        version: '1.0.0',
        vendor: 'Glen Simister.'
    };
    safeApp = await window.safe.initialiseApp(appInfo);
    console.log('Authorising SAFE application...');
    const authReqUri = await safeApp.auth.genAuthUri();
    const authUri = await window.safe.authorise(authReqUri);
    console.log('SAFE application authorised by user');
    await safeApp.auth.loginFromUri(authUri);
    console.log("Application connected to the network");
}

/***************** Posts table (need to change the names) *****************/

let md;
export async function createMutableData() {
    //md = await safeApp.mutableData.newRandomPublic(typeTag);
    try {
        console.log("Creating MutableData with initial dataset...");
        const hash = await safeApp.crypto.sha3Hash('POSTS_TABLE');
        md = await safeApp.mutableData.newPublic(hash, 15000);
        /*const initialData = {
            "random_key_1": JSON.stringify({
                webID: "safe://glen.devolution#me",
                date: "14 Jan, 2019",
                img: "safe://hygjurfty4kddbj6q7rgn9kq63djis73i17kbezddbd7afiynqhpqggjxixpy",
                name: "Glen Simister",
                post: "Welcome to DEVOLUTION - The evolution of decentralized governance."
            })
        };
        await md.quickSetup(initialData);*/
    } catch (err) {
        console.log(err);
    }
}

export async function insertItem(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await md.applyEntriesMutation(mutations);
}

export async function updateItem(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await md.applyEntriesMutation(mutations);
}

export async function deleteItems(key) {
    let items = [];
    items = await getItems();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        if (item.key == key) {
            await mutations.delete(item.key, item.version + 1);
        }
    });
    await md.applyEntriesMutation(mutations);
}

export async function getItems() {
    const entries = await md.getEntries();
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

/***************** users table *****************/

let users;
export async function createUsers() {
    console.log("Creating users table...");
    //users = await safeApp.mutableData.newRandomPublic(15000);

    try {
        const hash = await safeApp.crypto.sha3Hash('USERS_TABLE');
        users = await safeApp.mutableData.newPublic(hash, 15000);
        /*const id = await window.currentWebId["@id"];
        const img = await window.currentWebId["#me"]["image"]["@id"];
        const name = await window.currentWebId["#me"]["name"];
        const initialData = {
            "random_key_1": JSON.stringify({
                webID: id,
                photo: img,
                name: name,
                socialCredits: 0,
                healthCredits: 0,
                educationCredits: 0,
                rebate: 0
                // need to add other fields such as reg date and post code, etc
            })
        };
        await users.quickSetup(initialData);*/
    } catch (err) {
        console.log(err);
    }
}

export async function createNewUser() {
    const id = await window.currentWebId["@id"];
    const img = await window.currentWebId["#me"]["image"]["@id"];
    const name = await window.currentWebId["#me"]["name"];
    let users = [];
    users = await listUsers();
    users.forEach(async(user) => {
        if (user.value.webID == id) {
            return; //user already exists
        } else {
            let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            await insertUser(guid, {
                webID: id,
                photo: img,
                name: name,
                socialCredits: 0,
                healthCredits: 0,
                educationCredits: 0,
                rebate: 0
            });
        }
    });
}

export async function insertUser(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await users.applyEntriesMutation(mutations);
}

export async function updateUser(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await users.applyEntriesMutation(mutations);
}

export async function listUsers() {
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


/***************** Officials table *****************/

let officials;
export async function createOfficials() {
    console.log("Creating officials table...");
    //officials = await safeApp.mutableData.newRandomPublic(15000);
    try {
        const hash = await safeApp.crypto.sha3Hash('OFFICIALS');
        officials = await safeApp.mutableData.newPublic(hash, 15000);
        //await officials.quickSetup();
    } catch (err) {
        console.log(err);
    }
}

export async function insertOfficial(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await officials.applyEntriesMutation(mutations);
}

export async function updateOffical(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await officials.applyEntriesMutation(mutations);
}

export async function deleteOfficial(key) {
    let items = [];
    items = await listOfficials();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        if (item.key == key) {
            await mutations.delete(item.key, item.version + 1);
        }
    });
    await officials.applyEntriesMutation(mutations);
}

export async function listOfficials() {
    const entries = await officials.getEntries();
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
