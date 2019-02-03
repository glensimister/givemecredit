/***************** Posts table (need to change the names) *****************/

let md;
async function createPosts(reset) {
    try {
        console.log("Initializing posts dataset...");
        const hash = await safeApp.crypto.sha3Hash('POSTS_DATASET');
        md = await safeApp.mutableData.newPublic(hash, 15000);
        if (reset) {
            await md.quickSetup();
        }
    } catch (err) {
        console.log(err);
    }
}

async function safeInsertPost(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await md.applyEntriesMutation(mutations);
}

async function safeUpdatePost(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await md.applyEntriesMutation(mutations);
}

async function safeDeletePost(key) {
    let items = [];
    items = await safeGetPosts();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        if (item.key == key) {
            await mutations.delete(item.key, item.version + 1);
        }
    });
    await md.applyEntriesMutation(mutations);
}

async function deleteAllPosts() {
    let items = [];
    items = await listUsers();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        await mutations.delete(item.key, item.version + 1);
    });
    await md.applyEntriesMutation(mutations);
    console.log('posts have been deleted');
}

async function safeGetPosts() {
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
