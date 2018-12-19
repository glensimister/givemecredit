var user = gun.user();

import {
    comments
} from './functions/comments.js';

import {
    connect
} from './functions/connect.js';

import {
    toolbar
} from './functions/toolbar.js';

import {
    status
} from './functions/status.js';

import {
    listCandidates
} from './functions/listCandidates.js';

import {
    distributeCredits,
    donateSocialCredits,
    transferCredits
} from './functions/credits.js';

import {
    applyAsCandidate
} from './functions/applyAsCandidate.js';

import {
    vote
} from './functions/vote.js';

import {
    displayPubService
} from './functions/displayPubService.js';

import {
    listElected
} from './functions/listElected.js';

import {
    displayUserData
} from './functions/displayUserData.js';

import {
    getProfile
} from './functions/getProfile.js';

import {
    lottery
} from './functions/lottery.js';



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

        /*this.get('#/profile', function () {
            getPage("pages/profile.html");
        });*/

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

    function getPage(url, cb) {
        $('.sidebar ul li a.active').removeClass('active');
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                $.getScript("js/initializeplugins.js");
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
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);
