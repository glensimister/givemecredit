import {
    displayStatus
}
from './status.js';

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

let md;
export async function createMutableData() {
    console.log("Creating MutableData with initial dataset...");
    const typeTag = 15000;
    md = await safeApp.mutableData.newRandomPublic(typeTag);
    const initialData = {
        "random_key_1": JSON.stringify({
            webID: "safe://glen.devolution#me",
            date: "14 Jan, 2019",
            post: "Welcome to DEVOLUTION - the evolution of decentralized governance. For more information about how it works please go to youtube and type \"DEVOLUTION glen\" (cannnot access clearnet on SAFE browser)."
        })
    };
    await md.quickSetup(initialData);
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
};

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
