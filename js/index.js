/* Import all of the Javascript components. */ 

import {
    authoriseAndConnect, 
    createPosts, 
    createOfficials, 
    createUsers, 
    createNewUser, 
    deleteAllUsers,
    isUserVerified,
    deleteAllOfficials,
    createSafeCoin,
    addFunds,
    getBalance
}
from './general/safenetwork.js';
import {displayUserData} from './general/displayUserData.js';
import './general/sidebar.js';
import './general/navTop.js';
import './general/connect.js';
import './general/toolbar.js';
import {distributeSocCredits} from './general/distributeSocCredits.js';
import {initScripts} from './general/initScripts.js';
import {lottery} from './general/lottery.js';
import {slotMachine} from './casino/slotMachine.js';
import {displayPosts} from './posts/displayPosts.js';
import './posts/comments.js';
import {course} from './education/course.js';
import {listCandidates} from './voting/listCandidates.js';
import {displayOfficialProfile} from './voting/displayOfficialProfile.js';
import {displayPubService} from './publicServices/displayPubService.js';

$( document ).ready(async function() {
   
/* popup window for settings */    
    
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
    

/* initalize SAFE API */

await authoriseAndConnect();
await createUsers();
await createSafeCoin();


/* intro page */
    
const webId = await window.currentWebId["@id"];
const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
const webIdName = await window.currentWebId["#me"]["name"];

$('.enter, .reset').on('click', async function (e) {
    
    /*** reset DB (for testing purposes) ***/
    if($(this).hasClass('reset')) {
        await deleteAllUsers();
        await deleteAllOfficials();
    }
    
    e.stopImmediatePropagation();
    let verified = await isUserVerified(webId);
    if (!verified) {
        $('#introContainer').fadeOut(2000);
        $('.stars').addClass('animated zoomIn');
        $('.twinkling').addClass('animated zoomIn');
        $('#intro').addClass('animated zoomOut');
        $('#register').show();
    } else {
        $('#introContainer').fadeOut(2000);
        $('.stars').addClass('animated zoomIn');
        $('.twinkling').addClass('animated zoomIn');
        $('#intro').addClass('animated zoomOut');
        $('#container').show();
    }
});
    

$(document.body).on('click', '.verifyPostCode', async function () {
    let pubKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await createNewUser(webId, webIdImg, webIdName, pubKey);
    await addFunds(guid, {
        pubKey: pubKey, 
        balance: 100
    });
    let balance = await getBalance(pubKey);
    $('.rebate div').html(balance);
    $('#register').hide();
    $('#container').show();
});

await createPosts();
await createOfficials();
    
try {
    await displayUserData();
} catch (err) {
    alert(err.message + ". Please make sure you have enabled experimental API and selected your webID.");
}
    
displayPosts();

/* page routing */
    
    var app = $.sammy(function () {
        this.get('#/', function () {
            getPage("pages/home.html");
        });
        this.get('/index.html', function () {
            getPage("pages/home.html");
        });
        this.get('/', function () {
            getPage("pages/home.html");
        });

        this.get('#/:page', function () {
            var page = this.params['page'];
            getPage('pages/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
        });

        this.get('#/:folder/:page', function () {
            var folder = this.params['folder'];
            var page = this.params['page'];
            getPage('pages/' + this.params['folder'] + '/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
        });
    });

    $(function () {
        app.run()
    });

    /* insert scripts on correct pages */

    function getPage(url, cb) {
        $('.sidebar ul li a.active').removeClass('active');
        var thisPage = url.split("/");
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                initScripts();
                console.log("The current page is: " + thisPage[1]);
                
                switch (thisPage[1]) {
                    case 'home.html':
                        displayUserData();
                        displayPosts();
                        break;
                    case 'publicservices':
                        displayPubService();
                        break;
                    case 'voting':
                        listCandidates();
                        displayOfficialProfile();
                        break;
                    case 'education':
                        course();
                        break;
                    case 'casino':
                        lottery();
                        slotMachine();
                        break;
                }
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
});