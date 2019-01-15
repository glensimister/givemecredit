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
