// NOTE: This is for testing purposes and will not be included in the application

let initPosts;
let initUsers;
let initSafeCoin;

async function initialzeData() {
    try {
        const hash = await safeApp.crypto.sha3Hash('POSTS_DATASET');
        initPosts = await safeApp.mutableData.newPublic(hash, 15000);
        const initialPostsData = {
            "random_key_1": JSON.stringify({
                date: "18 Feburary 2019",
                img: "safe://hygjurftycox416pmiab3yrowypcxgxbx6op6bxynhz99mqhcbywyeac71pxy",
                name: "Bob Smith",
                post: "Welcome to Devolution - the evolution of decentralized governance!"
            })
        };
        await initPosts.quickSetup(initialPostsData);
    } catch (err) {
        console.log(err);
    }

    try {
        const hash = await safeApp.crypto.sha3Hash('USERS_DATASET');
        initUsers = await safeApp.mutableData.newPublic(hash, 15000);
        let pubKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const initialUsersData = {
            "random_key_1": JSON.stringify({
                webID: "safe://bob.smith#me",
                photo: "safe://hygjurftycox416pmiab3yrowypcxgxbx6op6bxynhz99mqhcbywyeac71pxy",
                name: "Bob Smith",
                country: 'UK',
                postCode: 'TQ10XYZ',
                socialCredits: 0,
                healthCredits: 0,
                educationCredits: 0,
                pubKey: pubKey
            })
        };
        await initUsers.quickSetup(initialUsersData);
    } catch (err) {
        console.log(err);
    }

    try {
        const hash = await safeApp.crypto.sha3Hash('SAFECOIN_DATASET');
        initSafeCoin = await safeApp.mutableData.newPublic(hash, 15000);
        await initSafeCoin.quickSetup();
    } catch (err) {
        console.log(err);
    }

    try {
        const hash = await safeApp.crypto.sha3Hash('OFFICIALS_DATASET');
        officials = await safeApp.mutableData.newPublic(hash, 15000);
        await officials.quickSetup();
    } catch (err) {
        console.log(err);
    }

}
