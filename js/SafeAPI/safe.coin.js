/***************** SAFE Coin (pretend) *****************/

let safeCoin;

async function createSafeCoin(reset) {
    console.log("Creating SAFE wallet...");
        try {
        const hash = await safeApp.crypto.sha3Hash('SAFECOIN_DATASET');
        safeCoin = await safeApp.mutableData.newPublic(hash, 15000);
        if (reset){
           await safeCoin.quickSetup(); 
        }  
    } catch (err) {
        console.log(err);
    }
}

async function addFunds(key, value) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.insert(key, JSON.stringify(value));
    await safeCoin.applyEntriesMutation(mutations);
    console.log("funds added to account");
}

async function sendTo(pubKey, amount) {
    let items = [];
    items = await getAllBalances();
    items.forEach(async(item) => {
        let str = pubKey.localeCompare(item.value.pubKey);
        if (str == 0) {
            item.value.balance = amount;
            await updateBalance(item.key, item.value, item.version);
            console.log("balance of " + pubKey + " has been updated to " + amount + "SafeCoin");
        }
    });
}

async function updateBalance(key, value, version) {
    const mutations = await safeApp.mutableData.newMutation();
    await mutations.update(key, JSON.stringify(value), version + 1);
    await safeCoin.applyEntriesMutation(mutations);
}

async function getBalance(pubKey) {
    let balance = 0;
    let items = [];
    items = await getAllBalances();
        items.forEach(async(item) => {
        let str = pubKey.localeCompare(item.value.pubKey);
        if (str == 0) {
            balance = item.value.balance;
        }     
    });
    return balance;
}


async function deleteAllAccounts() {
    console.log("trying to delete accounts...");
    let items = [];
    items = await getAllBalances();
    const mutations = await safeApp.mutableData.newMutation();
    items.forEach(async(item) => {
        console.log(item);
        await mutations.delete(item.key, item.version + 1);
    });
    await safeCoin.applyEntriesMutation(mutations);
    console.log('all accounts have been deleted');
}


async function getAllBalances() {
    const entries = await safeCoin.getEntries();
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