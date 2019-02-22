let posts;
async function safe_createPosts() {
    try {
        console.log("Initializing posts dataset...");
        const hash = await safeApp.crypto.sha3Hash('POSTS_DATASET');
        posts = await safeApp.mutableData.newPublic(hash, 15000);
    } catch (err) {
        console.log(err);
    }
}

async function safe_insertPost(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await posts.applyEntriesMutation(mutations);
}

async function safe_updatePost(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await posts.applyEntriesMutation(mutations);
}

async function safe_deletePost(key) {
    let items = [];
    items = await safe_getPosts();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        let str = key.localeCompare(item.key);
        if (str == 0) {
            await mutations.delete(item.key, item.version + 1);
        }
    });
    await posts.applyEntriesMutation(mutations);
}

async function safe_getPosts() {
    try {
        const entries = await posts.getEntries();
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
    } catch (err) {
        console.log(err);
    }
}
