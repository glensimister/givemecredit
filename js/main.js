$(document).ready(function () {
    $(document.body).on('click', '.pay-tax', function () {
        $('.sc').html("240");
        $('.hc').html("141");
        $('.ec').html("20");
    });

    $(document.body).on('click', '.donate-sc', function () {
        var input = $(this).prev().find('input').val();
        var select = $(this).parent().find('select option:selected').val();
        var parent_class = $(this).parent().attr('class');

        if (parent_class == 'topup-hc') {
            if (select == 'Social Credits') {
                transferCredits('.sc', '.hc', input);
            } else if (select == 'Education Credits') {
                transferCredits('.ec', '.hc', input);
            }
        } else if (parent_class == 'topup-ec') {
            transferCredits('.sc', '.ec', input);
        } else if (select == 'Social Credits') {
            deductCredits('.sc', input);
        } else if (select == 'Health Credits') {
            deductCredits('.hc', input);
        } else if (select == 'Education Credits') {
            deductCredits('.ec', input);
        };

        function transferCredits(from, to, amount) {
            var type_from = $(from).html();
            type_from = (type_from - amount);
            $(from).html(type_from.toFixed(0));
            var type_to = $(to).html();
            type_to = (parseInt(type_to) + parseInt(amount));
            $(to).html(type_to.toFixed(0));
        }

        function deductCredits(type, amount) {
            var current_value = $(type).html();
            var new_value = (current_value - amount);
            $(type).html(new_value.toFixed(0));
        }

        //rebate
        var rebate = 10 / 100 * input;
        var result = 0;
        result = $('.rebate').text();
        result = rebate + parseInt(result);
        $('.rebate').html(result.toFixed(0));

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
