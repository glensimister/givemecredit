(function ($) {
    $(document.body).on('click', '.topup-hc, .topup-ec', function (e) {
        e.stopImmediatePropagation();
        let classToUpdate;
        if ($(this).hasClass('topup-hc')) {
            classToUpdate = '.hc div';
        } else
        if ($(this).hasClass('topup-ec')) {
            classToUpdate = '.ec div';
        }
        let id = $(this).attr("title");
        var input = $(this).parent().parent().find('input').val();
        let raisedSoFar = $('#' + id + ' .creditsReceived').html();
        let received = parseInt(raisedSoFar) + parseInt(input);
        let progress = updateProgressBar(id, input, received);
        transfer('.sc div', classToUpdate, input);
        updateCredits(classToUpdate, input);
    });

    async function updateCredits(type, amount) {
        const id = await window.currentWebId["@id"];
        let items = [];
        items = await listUsers();
        items.forEach(async(item) => {
            if (item.value.webID == id) {
                if (type == '.hc div') {
                    item.value.healthCredits = parseFloat(item.value.healthCredits) + parseFloat(amount);
                } else if (type == '.ec div') {
                    item.value.educationCredits = parseFloat(item.value.educationCredits) + parseFloat(amount);
                }
                item.value.socialCredits = parseFloat(item.value.socialCredits) - parseFloat(amount);
                await updateUser(item.key, item.value, item.version);
            }
        });
    }

    /*** This will need to be a separate function ***/

    function updateProgressBar(key, value, raised) {
        $('#' + key + ' .creditsReceived').html(parseInt(raised) + parseInt(value));
        let monthlyTarget = $('#' + key + ' .monthlyTarget').html();
        let percentage = (parseInt(value) / parseInt(monthlyTarget)) * 100;
        let percentageString = percentage.toFixed(0) + "%";
        let progressBarDiv = $('#' + key + " .progress-bar > div");
        if (percentage <= 100) {
            progressBarDiv.css("width", percentageString);
        } else {
            progressBarDiv.css("width", "100%");
        }
        return percentageString;
    }

    function transfer(from, to, amount) {
        var fromVal = $(from).html();
        var toVal = $(to).html();
        var new_value = (parseInt(fromVal) - parseInt(amount));
        $(from).html(new_value.toFixed(0));
        new_value = (parseInt(toVal) + parseInt(amount));
        $(to).html(new_value).addClass('animated heartBeat');;
    }
})(jQuery);
