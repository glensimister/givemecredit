/* Import all of the Javascript components. */ 

if (!safeExperimentsEnabled) {
    alert("You need to toggle experiments (top right) and/or select a webId (top left)");
}

import './general/sidebar.js';
import './general/navTop.js';
import './general/connect.js';
import './general/toolbar.js';
import {initScripts} from './general/initScripts.js';

$( document ).ready(async function() {
    
/* popup window for settings. This could be put in home folder */    
    
$('.fa-gears').on('click', function () {
    $('.settings').load('pages/settings.html', function () {
        $('.settings').dialog({
            title: "General Settings",
            width: "auto",
            draggable: false,
            height: 400
        });
    });
}); 

/**** initialize SAFE app and data sets ****/

let reset = true; /* this is for testing purposes */
await authoriseAndConnect();
    
try {
    await createUsers(reset);
    await createSafeCoin(reset);
    await createPosts(reset);
    await createOfficials(reset);
} catch (err) {
    console.log(err + " Error creating datasets. Trying again...");
    reset = false;
    await createUsers(reset);
    await createSafeCoin(reset);
    await createPosts(reset);
    await createOfficials(reset);
}

/* intro page */

$('.enter, .reset').on('click', async function (e) {
    e.stopImmediatePropagation();
    
/*** these variables need to be accessed by the whole app ****/
const webId = await window.currentWebId["@id"];
const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
const webIdName = await window.currentWebId["#me"]["name"];

    /*** reset DB (for testing purposes) ***/
    if ($(this).hasClass('reset')) {
        try {
            await deleteAllUsers();
            await deleteAllOfficials();
            await deleteAllPosts();
            await deleteAllAccounts();
        } catch (err) {
            console.log(err + " Deleting datasets failed");
        }
    } else {
        let verified = await isUserVerified(webId); // check if user exists
        if (!verified) {
            $('#introContainer').fadeOut(2000);
            $('.stars').addClass('animated zoomIn');
            $('.twinkling').addClass('animated zoomIn');
            $('#intro').addClass('animated zoomOut');
            $('#register').show(); //if user is not verified show them the registration form
        } else {
            $('#introContainer').fadeOut(2000);
            $('.stars').addClass('animated zoomIn');
            $('.twinkling').addClass('animated zoomIn');
            $('#intro').addClass('animated zoomOut');
            $('#container').show();
        }
    }
});
  
/*** the unverified user will be presented with a form. When they click submit a new user is created and account credited ***/
    
$(document.body).on('click', '.verifyPostCode', async function (e) {
    e.stopImmediatePropagation();
    const webId = await window.currentWebId["@id"];
    const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
    const webIdName = await window.currentWebId["#me"]["name"];
    let pubKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    try {
        await createNewUser(webId, webIdImg, webIdName, pubKey);
    } catch (err) {
        console.log(err);
    }
    
    //let balance = 100;
    try {
        await addFunds(guid, {
            pubKey: pubKey,
            balance: 100
        });
        let bal = await getBalance(pubKey);
        $('.rebate div').html(bal);
    } catch (err) {
        console.log(err + " There was a problem adding funds");
    }
    $('#register').hide();
    $('#container').show();
});

/***** page routing with sammy.js *****/   
    
function loadHomePage() {
    $('.sidebar ul li a.active').removeClass('active');
    $(".content").load("pages/home/index.html", function () {
        $.getScript("pages/home/index.js");
        initScripts();
    });
}
        
var app = $.sammy(function () {
    this.get('#/', function () {
        loadHomePage()
    });
    this.get('/index.html', function () {
        loadHomePage()
    });
    this.get('/', function () {
        loadHomePage()
    });
    this.get('#/:page', function () {
        $('.sidebar ul li a.active').removeClass('active');
        var page = this.params['page'];
        let pageUrl = 'pages/' + page + '.html';
        $(".content").load(pageUrl, function () {
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
            initScripts();
        });
    });
    this.get('#/:folder/:page', function () {
        $('.sidebar ul li a.active').removeClass('active');
        var folder = this.params['folder'];
        var page = this.params['page'];
        let pageUrl = 'pages/' + folder + '/' + page + '.html';
        let scriptUrl = 'pages/' + folder + '/index.js';
        $(".content").load(pageUrl, function () {
            $.getScript(scriptUrl);
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
            initScripts();
        });
    });
    this.get('#/:folder/:subfolder/:page', function () {
        $('.sidebar ul li a.active').removeClass('active');
        var folder = this.params['folder'];
        var subfolder = this.params['subfolder'];
        var page = this.params['page'];
        let pageUrl = 'pages/' + folder + '/' + subfolder + '/' + page + '.html';
        let scriptUrl = 'pages/' + folder + '/index.js';
        $(".content").load(pageUrl, function () {
            $.getScript(scriptUrl);
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
            initScripts();
        });
    });
});

    $(function () {
        app.run()
    });
});