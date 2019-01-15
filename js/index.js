var user = gun.user();

/* Import all of the Javascript components. */ 

import {authoriseAndConnect,createMutableData,createOfficials} from './components/safenetwork.js';
import {sidebar} from './components/sidebar.js';
import {navTop} from './components/navTop.js';
import {comments} from './components/comments.js';
import {connect} from './components/connect.js';
import {toolbar} from './components/toolbar.js';
import {posts, displayPosts} from './components/posts.js';
import {distributeCredits,donateSocialCredits,transferCredits} from './components/credits.js';
import {listCandidates} from './components/voting/listCandidates.js';
import {applyAsCandidate} from './components/voting/applyAsCandidate.js';
import {electCandidate} from './components/voting/electCandidate.js';
import {displayPubService} from './components/publicServices/displayPubService.js';
import {displayUserData} from './components/displayUserData.js';
import {getProfile} from './components/getProfile.js';
import {lottery} from './components/lottery.js';
import {initScripts} from './components/initScripts.js';

/* load partials */

$('.sidebar').load("partials/sidebar.html", function(){sidebar();});
$('.dropdown-container').load("partials/navtop.html", function(){navTop();});
$('.grid-search').load("partials/searchbar.html");

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
})().catch(err => {
    console.error(err);
});

distributeCredits(); //initalize credits

/* routing */ 

;
(function ($) {
    var app = $.sammy(function () {
        this.get('#/', function () {getPage("pages/home.html");});
        this.get('/index.html', function () {getPage("pages/home.html");});
        this.get('/', function () {getPage("pages/home.html");});
        
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
                console.log('current page: ' + thisPage[1]);
                //load home page scripts
                initScripts();
                displayUserData();
                //displayPosts();
                connect();
                toolbar();
                comments();
                //posts();
                
                //load page specific scripts
                if (thisPage[1] === 'publicservices') { 
                    displayPubService();
                    //donateSocialCredits();
                    transferCredits();
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] == 'profile.html') {
                    getProfile(); 
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] == 'voting') {
                    listCandidates();
                    applyAsCandidate();
                    //electCandidate();
                    //updateOffical();
                    //listOfficials();
                    //applyAsCandidate();
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] === 'lottery.html') {
                    lottery();  
                    console.log(thisPage[1] + ' scripts loaded');
                }
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);
