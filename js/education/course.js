// TO DO

export function course() {
    $('.submit-feedback').on('click', function (e) {
        e.stopImmediatePropagation();
        $('#tab3').prop('checked', true);
        transfer('.ec div', '.rebate div', '20');
    });

    function transfer(from, to, amount) {
        var fromVal = $(from).html();
        var toVal = $(to).html();
        var new_value = (parseInt(fromVal) - parseInt(amount));
        $(from).html(new_value.toFixed(0));
        new_value = (parseInt(toVal) + parseInt(amount));
        $(to).html(new_value).addClass('animated heartBeat');
    }
}
