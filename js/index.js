/* load partials */

$('.sidebar').load("partials/sidebar.html");
$('.dropdown-container').load("partials/navtop.html");
$('.grid-search').load("partials/searchbar.html");

/* Import all of the Javascript components. */ 

import {authoriseAndConnect,createMutableData,createOfficials,createUsers} from './components/safenetwork.js';
import {displayUserData} from './components/displayUserData.js';
import './components/sidebar.js';
import './components/navTop.js';
import './components/posts/comments.js';
import './components/connect.js';
import './components/toolbar.js';
import {displayPosts} from './components/posts/displayPosts.js';
import {course} from './components/education/course.js';
import {listCandidates} from './components/voting/listCandidates.js';
import {displayOfficialProfile} from './components/voting/displayOfficialProfile.js';
import {displayPubService} from './components/publicServices/displayPubService.js';
import {lottery} from './components/lottery.js';
import {initScripts} from './components/initScripts.js';

    /* initalize SAFE API and display posts */
    (async() => {
        await authoriseAndConnect();
        try {
            await displayUserData();
        } catch (err) {
            alert(err.message + ". Please make sure you have enabled experimental API and selected your webID.");
        }
        await createMutableData(); //this will need to be changed to createPosts()
        await createOfficials();
        await createUsers();
        displayPosts();
        initScripts();
    })().catch(err => {
        console.error(err);
    });

/* initalize credits bar. This will be removed soon */

$('.sc').html("240");
$('.hc').html("50");
$('.ec').html("65");

/* page routing */
;
(function ($) {

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
                        break;
                    case 'publicservices':
                        displayPubService();
                        break;
                    case 'profile.html':
                        displayOfficialProfile();
                        break;
                    case 'voting':
                        listCandidates();
                        break;
                    case 'education':
                        course();
                        initScripts();
                        break;
                    case 'lottery.html':
                        lottery();
                        break;
                }
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);