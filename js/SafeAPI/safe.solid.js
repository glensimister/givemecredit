// NOTE: This for testing purposes and is not used in the application
async function safe_createSolidMd() { 
const webId = await window.currentWebId["#me"]["@id"];
const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
const webIdName = await window.currentWebId["#me"]["name"];
    
const hash = await safeApp.crypto.sha3Hash('SOLID');
const md = await safeApp.mutableData.newPublic(hash, 15000); 
    
const rdf = await md.emulateAs('RDF');

let postId = `${webId}/posts/${Math.round( Math.random() * 100000 )}`; 
    
//sym() - Creates an RDF resource identified by a URI
let postsUri = rdf.sym(postId); 
//console.log(postsUri);

const ACTSTREAMS = rdf.namespace( 'https://www.w3.org/ns/activitystreams/' );
await rdf.add(postsUri, ACTSTREAMS( 'type' ), rdf.literal('Post'));
await rdf.add(postsUri, ACTSTREAMS( 'attributedTo' ), rdf.sym(webId));
await rdf.add(postsUri, ACTSTREAMS( 'content' ), rdf.literal("Hello RDF! This is my first post!"));
//const serial = await rdf.serialise('text/turtle');
//console.log(rdf);

    
/*
const subject = rdf.sym(webId);
const profile = subject.doc(); 
const VCARD = new rdf.namespace('http://www.w3.org/2006/vcard/ns#'); 
rdf.add(subject, VCARD('fn'), "John Bloggs", profile);*/
    
const webIdMd = await md.emulateAs('WebId');
await webIdMd.fetchContent();
//console.log(webIdMd);
const webIdTurtle = await webIdMd.serialise();
console.log('WebID serialised as Turtle:', webIdTurtle);
}

