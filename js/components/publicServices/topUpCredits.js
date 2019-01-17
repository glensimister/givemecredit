import {
    listUsers, updateUser
}
from '../safenetwork.js';

export default (function () {
    $(document.body).on('click', '.topup-hc, .topup-ec', function (e) {
        e.stopImmediatePropagation();
        let classToUpdate;
        if ($(this).hasClass('topup-hc')) {
            classToUpdate = '.hc';
        } else
        if ($(this).hasClass('topup-ec')) {
            classToUpdate = '.ec';
        }
        let id = $(this).attr("title");
        var input = $(this).parent().parent().find('input').val();
        let raisedSoFar = $('#' + id + ' .creditsReceived').html();
        let received = parseInt(raisedSoFar) + parseInt(input);
        let progress = updateProgressBar(id, input, received);
        transfer('.sc', classToUpdate, input);
        updateCredits(classToUpdate, input);
    });

    async function updateCredits(type, amount) {
        const id = await window.currentWebId['#me']["@id"];
        let items = [];
        items = await listUsers();
        items.forEach(async(item) => {
            if (item.value.webID == id) {
                if (type == '.hc') {
                    item.value.healthCredits = amount;
                } else if (type == '.ec') {
                    item.value.educationCredits = amount;
                }
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
        $(to).html(new_value);
    }
}());