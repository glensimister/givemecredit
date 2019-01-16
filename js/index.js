var user = gun.user();

/* Import all of the Javascript components. */ 

import {authoriseAndConnect,createMutableData,createOfficials} from './components/safenetwork.js';
import {sidebar} from './components/sidebar.js';
import {navTop} from './components/navTop.js';
import {comments} from './components/comments.js';
import {connect} from './components/connect.js';
import {toolbar} from './components/toolbar.js';
import {displayPosts} from './components/posts/displayPosts.js';
import {distributeCredits,transferCredits} from './components/credits.js';
import {listCandidates} from './components/voting/listCandidates.js';
import {displayOfficialProfile} from './components/voting/displayOfficialProfile.js';
import {displayPubService} from './components/publicServices/displayPubService.js';
import {displayUserData} from './components/displayUserData.js';
import {lottery} from './components/lottery.js';
import {initScripts} from './components/initScripts.js';

/* load partials */

$('.sidebar').load("partials/sidebar.html", function(){sidebar();});
$('.dropdown-container').load("partials/navtop.html", function(){navTop();});
$('.grid-search').load("partials/searchbar.html");


distributeCredits(); //initalize credits

;
(function ($) {
    
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
        getPage("pages/home.html");
    })().catch(err => {
        console.error(err);
    });
    
    /* page routing */ 
    
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
                //load home page scripts - move these to the top??? 
                initScripts();
                displayUserData();
                connect();
                toolbar();
                comments();
                
               if (thisPage[1] == 'home.html') {
                   displayPosts();
                   console.log(thisPage[1] + ' scripts loaded');
               }
                
                //load page specific scripts
                if (thisPage[1] === 'publicservices') { 
                    displayPubService();
                    transferCredits();
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] == 'profile.html') {
                    displayOfficialProfile();
                    console.log(thisPage[1] + ' scripts loaded');
                }
                
                if (thisPage[1] == 'voting') {
                    listCandidates();
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
