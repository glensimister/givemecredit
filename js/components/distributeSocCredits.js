import {
    listUsers, updateUser
}
from './safenetwork.js';

export async function distributeSocCredits(credits) {
    let users = [];
    users = await listUsers();
    let share = (credits / users.length).toFixed(2);
    $('.sc').html(share);
    users.forEach(async(user) => {
        user.value.socialCredits = share;
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
