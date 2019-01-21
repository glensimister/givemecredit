import {
    listUsers, updateUser
}
from './safenetwork.js';

export async function distributeSocCredits(credits) {
    let current_val = $('.sc').html();
    let users = [];
    users = await listUsers();
    let share = (credits / users.length);
    let new_val = (parseFloat(share) + parseFloat(current_val));
    $('.sc').html(new_val.toFixed(2));
    users.forEach(async(user) => {
        let social_credits = parseFloat(user.value.socialCredits) + share;
        user.value.socialCredits = social_credits.toFixed(2);
        await updateUser(user.key, user.value, user.version);
    });
}

export async function slotMachine() {
    $('#Gira').on('click', function () {
        var cost_per_spin = $('.cost_per_spin').val();
        var current_val = $('.sc').html();
        safe_coin = $('.safe_coin').html();
        $('.safe_coin').html((parseFloat(safe_coin) - parseFloat(cost_per_spin)).toFixed(2));
        let social_credits = (parseFloat(current_val) + parseFloat(cost_per_spin)).toFixed(2);
        distributeSocCredits(social_credits);
    });
}
