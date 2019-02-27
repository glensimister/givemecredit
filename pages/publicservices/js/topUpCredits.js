(function ($) {
    $(document.body).on('click', '.topup-hc, .topup-ec', async function (e) {
        e.stopImmediatePropagation();
        let classToUpdate;
        if ($(this).hasClass('topup-hc')) {
            classToUpdate = '.hc div';
        } else
        if ($(this).hasClass('topup-ec')) {
            classToUpdate = '.ec div';
        }
        let divId = $(this).attr("title");
        let input = $(this).parent().parent().find('input').val();
        let monthlyTarget = $('#' + divId + ' .monthlyTarget').html();
        let progressBarDiv = $('#' + divId + " .progress-bar > div");
        let percentage;
        let percentageString;
        let items = [];
        items = await safe_getUsers();
        items.forEach(async(item) => {
            let str = webId.localeCompare(item.value.webId);
            if (str == 0) {
                if (classToUpdate == '.hc div') {
                    item.value.healthCredits = parseFloat(item.value.healthCredits) + parseFloat(input);
                    $('#' + divId + ' .creditsReceived').html(item.value.healthCredits);
                    $('.hc div').html(item.value.healthCredits);
                    percentage = (parseInt(item.value.healthCredits) / parseInt(monthlyTarget)) * 100;
                    percentageString = percentage.toFixed(0) + "%";
                    if (percentage <= 100) {
                        progressBarDiv.css("width", percentageString);
                    } else {
                        progressBarDiv.css("width", "100%");
                    }
                } else if (classToUpdate == '.ec div') {
                    item.value.educationCredits = parseFloat(item.value.educationCredits) + parseFloat(input);
                    $('#' + divId + ' .creditsReceived').html(item.value.educationCredits);
                    $('.ec div').html(item.value.educationCredits);
                    percentage = (parseInt(item.value.educationCredits) / parseInt(monthlyTarget)) * 100;
                    percentageString = percentage.toFixed(0) + "%";
                    if (percentage <= 100) {
                        progressBarDiv.css("width", percentageString);
                    } else {
                        progressBarDiv.css("width", "100%");
                    }
                }
                item.value.socialCredits = parseFloat(item.value.socialCredits) - parseFloat(input);
                await safe_updateUser(item.key, item.value, item.version);
            }
        });
    });
})(jQuery);
