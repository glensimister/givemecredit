$(document).ready(function () {
    $(document.body).on('click', '.pay-tax', function () {
        $('.sc').html("240");
        $('.hc').html("141");
        $('.ec').html("0");
    });

    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().parent().find('input').val();
        var select = $(this).parent().parent().parent().parent().find('select option:selected').val();
        var parent_class = $(this).parent().parent().parent().parent().attr('class');

        /*if ($(this).hasClass('topup-hc')) {
                if (select == 'Social Credits') {
                    transferCredits('.sc', '.hc', input);
                } else if (select == 'Education Credits') {
                    transferCredits('.ec', '.hc', input);
                }
            } else if ($(this).hasClass('topup-ec')) {
                transferCredits('.sc', '.ec', input);
            } else if (select == 'Social Credits') {
                deductCredits('.sc', input);
            } else if (select == 'Health Credits') {
                deductCredits('.hc', input);
            } else if (select == 'Education Credits') {
                deductCredits('.ec', input);
            }
        }*/

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
    });

    $(document.body).on('click', '.buy-ticket', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().prev().find('input').val();
        payTax(input);
    });

    function payTax(amount) {
        amount = amount * 10; //this is the price of a lottery ticket - although it is completely arbitrary
        var sc = $('.sc').html();
        var new_sc = (parseInt(sc) + parseInt(amount));
        $('.sc').html(new_sc);

        //var hc = $('.hc').html();
        //var new_hc = (parseInt(ec) + parseInt(amount));
        //$('.hc').html(new_hc);
    }

    function transferCredits(from, to, amount) {
        var type_from = $(from).html();
        type_from = (parseInt(type_from) - parseInt(amount));
        $(from).html(type_from.toFixed(0));
        var type_to = $(to).html();
        type_to = (parseInt(type_to) + parseInt(amount));
        $(to).html(type_to.toFixed(0));
    }

    function deductCredits(type, amount) {
        var current_value = $(type).html();
        var new_value = (parseInt(current_value) - parseInt(amount));
        $(type).html(new_value.toFixed(0));
        payRebate(amount);
    }

    //rebate
    function payRebate(amount) {
        var rebate = 10 / 100 * amount;
        var result = 0;
        result = $('.rebate').text();
        result = rebate + parseInt(result);
        $('.rebate').html(result.toFixed(0));
    }

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
            $(this).parent().parent().find('.post-desc').css("filter", "blur(0px)");
            $(this).removeClass('blurred');
            $(this).find('span').text('Flag'); //need to update this
        } else {
            $(this).parent().parent().find('.post-desc').css("filter", "blur(4px)");
            $(this).addClass('blurred');
            $(this).find('span').text('Show'); //need to update this
        }
    });
});
