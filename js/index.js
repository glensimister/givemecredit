/* Import all of the Javascript components. */ 

import {
    authoriseAndConnect, createPosts, createOfficials, createUsers, createNewUser, deleteAllUsers, resetUserCredits
}
from './general/safenetwork.js';
import {displayUserData} from './general/displayUserData.js';
import './general/sidebar.js';
import './general/navTop.js';
import './general/connect.js';
import './general/toolbar.js';
import {distributeSocCredits, slotMachine} from './general/distributeSocCredits.js';
import {initScripts} from './general/initScripts.js';
import {lottery} from './general/lottery.js';

import {displayPosts} from './posts/displayPosts.js';
import './posts/comments.js';
import {course} from './education/course.js';
import {listCandidates} from './voting/listCandidates.js';
import {displayOfficialProfile} from './voting/displayOfficialProfile.js';
import {displayPubService} from './publicServices/displayPubService.js';

$( document ).ready(async function() {
    
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
//await resetUserCredits();
//await deleteAllUsers();

/* intro page */

$('.enter, .register').on('click', async function (e) {
    e.stopImmediatePropagation();
    if ($(this).hasClass('register')) { await createNewUser(); }
    $('.stars').addClass('animated zoomIn');
    $('.twinkling').addClass('animated zoomIn');
    $('#intro').addClass('animated zoomOut');
    $('#introContainer').fadeOut(2000);
    $('#container').show();
    $('.sidebar ul li:nth-child(odd) a').addClass('animated slideInLeftSmall');
    $('.sidebar ul li:nth-child(even) a').addClass('animated slideInRightSmall');
});

await createPosts();
await createOfficials();
    
try {
    await displayUserData();
} catch (err) {
    alert(err.message + ". Please make sure you have enabled experimental API and selected your webID.");
}
    
displayPosts();
initScripts();

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
                console.log("The current page is: " + thisPage[1]);
                
                switch (thisPage[1]) {
                    case 'home.html':
                        displayUserData();
                        displayPosts();
                        $('.select2').select2();
                        break;
                    case 'publicservices':
                        displayPubService();
                        break;
                    case 'voting':
                        listCandidates();
                        displayOfficialProfile();
                        initScripts();
                        break;
                    case 'education':
                        course();
                        initScripts();
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