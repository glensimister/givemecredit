$(document).ready(function () {

    var gun = new Gun();
    var user = gun.user();
    gunAPI.listCandidates();
    gunAPI.listElected();
    gunAPI.displayService();
    //gunAPI.getProfile(); // this needs to be on click not onload


    $('.apply-for-position').on("click", function (e) {
        e.stopImmediatePropagation();
        var position = $('.candidate-position').val();
        gunAPI.applyAsCandidate(position);
    });


    /*$(document.body).on('click', '.pay-tax', function () {
        api.distributeCredits();
    });*/

    $(document.body).on('click', '.topup-hc', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().parent().find('input').val();
        api.transferCredits('.sc', '.hc', input);
    });

    $(document.body).on('click', '.topup-ec', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().parent().find('input').val();
        api.transferCredits('.sc', '.ec', input);
    });

    $(document.body).on('click', '.redeem-ec', function (e) {
        e.stopImmediatePropagation();
        api.transferCredits('.ec', '.rebate', '20');
    });

    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        api.donateSocialCredits(this);
    });

    $(document.body).on('click', '.buy-ticket', function (e) {
        e.stopImmediatePropagation();
        api.buyLotteryTicket(this);
    });

    $(document.body).on('click', '.lucky-dip', function (e) {
        e.stopImmediatePropagation();
        var $this;
        for (var i = 0; i < 7; i++) {
            $this = $(this).parent().siblings().find('.number' + [i]);
            $this.val(Math.floor((Math.random() * 9) + 1));
        }
    });

    $(document.body).on('click', '.add-new-numbers', function (e) {
        e.stopImmediatePropagation();
        var lotteryNumbers = `<ul class="lottery-input">
            <li><button class="btn btn-red lucky-dip">LUCK DIP</button></li>
            <li><input type="text" class="number1" /></li>
            <li><input type="text" class="number2" /></li>
            <li><input type="text" class="number3" /></li>
            <li><input type="text" class="number4" /></li>
            <li><input type="text" class="number5" /></li>
            <li><input type="text" class="number6" /></li>
            <li><i class="fa fa-times"></i></li>
        </ul>`;
        $('.lottery-ticket-numbers').append(lotteryNumbers);
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

    $('.connect, .disconnect').click(function (e) {
        e.stopImmediatePropagation();
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
        }

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
        var update = $('.status-update input').val();
        api.updateStatus(update, this, true);
    });

    $(document.body).on("keypress", '.post-comment-input', function (e) {
        e.stopImmediatePropagation();
        let comment = $('.post-comment-input').val();
        if (e.which == 13 && comment != '') {
            api.postComment(comment, $(this));
        }
    });

    // to do: if someone clicks like followed by dislike (or visa versa), it will need to subtract the like
    $(document.body).on("click", '.fa-thumbs-o-up, .fa-thumbs-o-down', function (e) {
        e.stopImmediatePropagation();
        var candidateID = $(this).attr("id");
        gunAPI.vote(candidateID);
    });

    $(document.body).on("click", '.fa-flag', function (e) {
        e.stopImmediatePropagation();
        api.flagPost($(this));
    });
});
