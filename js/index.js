/* load partials */

$('.sidebar').load("partials/sidebar.html");
$('.dropdown-container').load("partials/navtop.html");
$('.grid-search').load("partials/searchbar.html");

/* Import all of the Javascript components. */ 

import {authoriseAndConnect,createMutableData,createOfficials} from './components/safenetwork.js';
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
import {displayUserData} from './components/displayUserData.js';
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
        await createMutableData();
        await createOfficials();
        displayPosts();
        initScripts();
    })().catch(err => {
        console.error(err);
    });

/* initalize credits bar. This will be removed soon */

$('.sc').html("240");
$('.hc').html("40");
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
                //make this a case statement    

                if (thisPage[1] === 'home.html') {
                    displayUserData();
                    displayPosts();
                }

                if (thisPage[1] === 'publicservices') {
                    displayPubService();
                }

                if (thisPage[1] === 'profile.html') {
                    displayOfficialProfile();
                }

                if (thisPage[1] === 'voting') {
                    listCandidates();
                }

                if (thisPage[1] === 'education') {
                    course();
                    initScripts();
                }

                if (thisPage[1] === 'lottery.html') {
                    lottery();
                }
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);