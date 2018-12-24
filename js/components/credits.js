export function distributeCredits() {
    var credits = gun.get('credits')
    credits.put({
        social: "240", //these are dummy values
        health: "50",
        education: "0"
    })
    credits.once(function (data) {
        $('.sc').html(data.social);
        $('.hc').html(data.health);
        $('.ec').html(data.education);
    });
}

export function donateSocialCredits() {
    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().parent().find('input').val();
        deductCredits('.sc', input);

        function deductCredits(type, amount) {
            var current_value = $(type).html();
            var new_value = (parseInt(current_value) - parseInt(amount));
            $(type).html(new_value.toFixed(0));
            var usrPubKey = $('.donate-sc').attr('title'); //this needs to be 'this' but not working
            gun.get('services').map().once(function (data, key) {
                if (usrPubKey === data.id) {
                    var creditsReceived = parseInt(data.creditsReceived) + parseInt(amount);
                    gun.get(key).path('creditsReceived').put(creditsReceived);
                }
            });
            payRebate(amount);
        }

        function payRebate(amount) {
            var rebate = 10 / 100 * amount;
            var result = 0;
            result = $('.rebate').text();
            result = rebate + parseInt(result);
            $('.rebate').html(result.toFixed(0));
        }
    });
}

export function transferCredits() {
    $(document.body).on('click', '.topup-hc', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().parent().find('input').val();
        transfer('.sc', '.hc', input);
    });

    $(document.body).on('click', '.topup-ec', function (e) {
        e.stopImmediatePropagation();
        var input = $(this).parent().parent().find('input').val();
        transfer('.sc', '.ec', input);
    });

    $('.submit-feedback').on('click', function (e) {
        e.stopImmediatePropagation();
        $('#tab3').prop('checked', true);
        transfer('.ec', '.rebate', '20');
    });

    function transfer(from, to, amount) {
        var fromVal = $(from).html();
        var toVal = $(to).html();
        var new_value = (parseInt(fromVal) - parseInt(amount));
        $(from).html(new_value.toFixed(0));
        new_value = (parseInt(toVal) + parseInt(amount));
        $(to).html(new_value);
    }
}
