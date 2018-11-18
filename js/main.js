$(document).ready(function () {

    solidAPI.solidLogin();

    $(document.body).on('click', '.pay-tax', function () {
        api.distributeCredits();
    });

    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        api.donateSocialCredits(this);
    });

    $(document.body).on('click', '.buy-ticket', function (e) {
        e.stopImmediatePropagation();
        api.buyLotteryTicket(this);
    });

    $('.status-checkbox').on("click", function () {
        if ($(this).hasClass('checked')) {
            $(this).html('');
            $(this).removeClass('checked');
        } else {
            $(this).html('&#10004;');
            $(this).addClass('checked');
        }
    });

    $('.connect, .disconnect').click(function () {
        if ($(this).hasClass("disconnect")) {
            $(this).text("CONNECT");
            $(this).removeClass('disconnect');
        } else {
            $(this).text("DISCONNECT");
            $(this).addClass('disconnect');
        }
    });

    $('.sidebar ul li .treeview_a').on("click", function (e) {

        e.stopImmediatePropagation();
        $(this).toggleClass("open").next().slideToggle('fast');
        $(this).find('i').toggleClass('rotate-angle');

        /* There seems to be a small bug in this. Uncomment and test the menu...*/
        if ($(this).hasClass('open')) {
            /*$('ul.treeview-menu').not($(this).next()).slideUp('fast');*/
            var ulHeight = $(this).next()[0].scrollHeight;
            $('.sidebar').animate({
                'top': '-' + ulHeight
            }, 500);
        } else {
            /*$('.sidebar').find('i').not($(this).find('i')).toggleClass('rotate-angle');*/
            $('.sidebar').animate({
                'top': '0'
            }, 500);
        };

    });

    /* $('.sidebar ul li').on("click", function (e) {
         if (($(this).parent().css('display') == 'block') && (!$(this).hasClass('.treeview_a'))) {
             $(this).parent().slideUp();
         }
     }); */

    $('.top-nav ul li.has-dropdown > a').click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).parent().siblings().find('.dropdown-content').hide();
        $(this).parent().find('.dropdown-content').fadeToggle('fast');
        close_dropdown(true);
    });

    function close_dropdown(is_dropdown_open) {
        $('body').click(function (e) {
            e.stopImmediatePropagation();
            if (is_dropdown_open) {
                $('.dropdown-content').fadeOut('slow');
            }
        });
    }

    $('a.toggle-menu').click(function (e) {
        $('.sidebar ul:first-child').slideToggle('fast');
        e.stopImmediatePropagation();
    });

    $('.post-update button').click(function () {
        let update = $('.status-update input').val();
        solid.auth.trackSession(session => {
            const loggedIn = !!session;
            if (loggedIn) {
                api.updateStatus(update, this, true);
            } else {
                alert("You need to be logged in to post something");
            }
        });
    });

    $(document.body).on("keypress", '.post-comment-input', function (e) {
        e.stopImmediatePropagation();
        let comment = $('.post-comment-input').val();
        if (e.which == 13 && comment != '') {
            solid.auth.trackSession(session => {
                const loggedIn = !!session;
                if (loggedIn) {
                    //api.updateStatus(comment, this, false);
                    api.postComment(comment, $(this));
                } else {
                    alert("You need to be logged in to post something");
                }
            });
            return false; //<---- Add this line
        }
    });

    // to do: if someone clicks like followed by dislike (or visa versa), it will need to subtract the like
    $(document.body).on("click", '.fa-thumbs-o-up, .fa-thumbs-o-down', function (e) {
        e.stopImmediatePropagation();
        api.ratePost($(this));
    });

    $(document.body).on("click", '.fa-flag', function (e) {
        e.stopImmediatePropagation();
        api.flagPost($(this));
    });
});
