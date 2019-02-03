let solid;


async function createSolid() {

    const profile = {
        nick: "testing",
        name: "SAFENetwork Developer",
        uri: "safe://test.123"
    };

    //solid = await safeApp.mutableData.newRandomPublic(16048);
    //await solid.quickSetup();
    //const webIdRDF = await solid.emulateAs('WebID');

    const hash = await safeApp.crypto.sha3Hash('SOLID');
    solid = await safeApp.mutableData.newPublic(hash, 15000);
    const webIdRDF = await solid.emulateAs('WebID');
    try {
        await webIdRDF.create(profile, profile.nick);
    } catch (err) {
        console.log(err + ". Error creating profile");
    }

    const webId = await window.currentWebId['@id'];
    console.log(webId);
    const id = webIdRDF.sym(webId);
    console.log(id);
    
    const FOAF = webIdRDF.vocabs.FOAF;
    console.log(FOAF('name'));


    let webIds = [];
    webIds = await getWebIds();
    webIds.forEach((webId) => {
        console.log(webId);
    });

    //await webIdRDF.nowOrWhenFetched();
    //const FOAF = webIdRDF.vocabs.FOAF;
    //await webIdRDF.create(profile, profile.nick);
    //const serialised = await webIdRDF.serialise(mimeType);
    //await webIdRDF.fetchContent();
    //console.log(webIdRDF);
    //const webId = await window.currentWebId['#me']['@id'];
    //const graphId = `${webId}/posts`;
    //let postId = `${graphId}/${Math.round( Math.random() * 100000 )}`;
    //console.log(postId);


    //const {content} = await solid.fetch(webId);
    //console.log(content);
}

async function getWebIds() {
    const entries = await solid.getEntries();
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
