var user = gun.user();

/* Import all of the Javascript components. NOTE: I still need to settup conditional statements to load specific js on specific pages */ 

import {sidebar} from './components/sidebar.js';
import {navTop} from './components/navTop.js';
import {comments} from './components/comments.js';
import {connect} from './components/connect.js';
import {toolbar} from './components/toolbar.js';
import {status} from './components/status.js';
import {listCandidates} from './components/listCandidates.js';
import {distributeCredits,donateSocialCredits,transferCredits} from './components/credits.js';
import {applyAsCandidate} from './components/applyAsCandidate.js';
import {vote} from './components/vote.js';
import {displayPubService} from './components/displayPubService.js';
import {listElected} from './components/listElected.js';
import {displayUserData} from './components/displayUserData.js';
import {getProfile} from './components/getProfile.js';
import {lottery} from './components/lottery.js';
import {education} from './components/education.js';


/* load partials */

$('.sidebar').load("partials/sidebar.html", function(){
    sidebar();
});

$('.dropdown-container').load("partials/navtop.html", function(){
    navTop();
});

$('.grid-search').load("partials/searchbar.html");

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
    
    /* To Do: insert scripts on correct pages */

    function getPage(url, cb) {
        $('.sidebar ul li a.active').removeClass('active');
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                displayUserData();
                connect();
                toolbar();
                comments();
                status();
                displayPubService();
                getProfile();
                listCandidates();
                listElected();
                displayPubService();
                lottery();
                vote();
                applyAsCandidate();
                distributeCredits();
                donateSocialCredits();
                transferCredits();
                education();
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);
