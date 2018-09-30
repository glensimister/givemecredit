$(document).ready(function () {
    $(document.body).on('click', '.pay-tax', function () {
        $('.sc').html("240");
        $('.hc').html("141");
        $('.ec').html("20");
    });

    $(document.body).on('click', '.donate-sc', function () {
        var input = $(this).prev().find('input').val();

        //rebate
        var rebate = 10 / 100 * input;
        var result = 0;
        result = $('.rebate').text();
        result = rebate + parseInt(result);
        $('.rebate').html(result.toFixed(0));

        //deduct social credits
        var sc = $('.sc').text();
        sc = (sc - input);
        $('.sc').html(sc.toFixed(0));

        /*
        var has_ec = $(this).closest("div.input-group").find("button").hasClass("transfer-ec");
        if (has_ec) {
            var ec = $('.ec').text();
            ec = (parseInt(v) + parseInt(ec));
            $('.ec').html(ec.toFixed(0));
        }*/
    });

    $('.status-checkbox').click(function () {
        $(this).html('&#10004;');
    });

    $('.connect, .disconnect').click(function () {
        if ($(this).hasClass("disconnect")) {
            $(this).text("CONNECT");
            $(this).removeClass('disconnect');
            //var position = $(this).parent().find('.position').html();
            //console.log(position);
        } else {
            $(this).text("DISCONNECT");
            $(this).addClass('disconnect');
        }
    });

    $('.sidebar ul li.treeview a').click(function (e) {
        $(this).next().slideToggle('fast');
        e.stopImmediatePropagation();
        var i = $(this).parent().find('i');
        if ((i).hasClass("rotate-angle")) {
            i.removeClass('rotate-angle');
        } else {
            i.addClass('rotate-angle');
        }

    });

    $('.top-nav ul li.has-dropdown a').click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('.dropdown-content').fadeToggle('fast');
    });

    $('a.toggle-menu').click(function (e) {
        $('.sidebar ul').slideToggle('fast');
        e.stopImmediatePropagation();
    });

    $('.post-update button').click(function () {
        var post = $('.status-update input').val();
        var status_update = {
            post: post
        };
        var template = $('#postTpl').html();
        var html = Mustache.to_html(template, status_update);
        $('.post-feed').prepend(html);
    });

    $('.flag').click(function () {
        if ($(this).hasClass("blurred")) {
            $(this).closest('div').find('.post-desc').css("filter", "blur(0px)");
            $(this).removeClass('blurred');
            $(this).find('span').text('Flag');
        } else {
            $(this).closest('div').find('.post-desc').css("filter", "blur(4px)");
            $(this).addClass('blurred');
            $(this).find('span').text('Show');
        }
    });
});
