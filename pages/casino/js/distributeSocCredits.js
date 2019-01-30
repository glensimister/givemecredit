async function distributeSocCredits(credits) {
    let current_val = $('.sc div').html();
    let users = [];
    users = await safeGetUsers();
    let share = (credits / users.length);
    let new_val = (parseFloat(share) + parseFloat(current_val));
    $('.sc div').html(new_val.toFixed(2)).addClass('animated heartBeat');
    users.forEach(async(user) => {
        user.value.socialCredits = parseFloat(user.value.socialCredits) + parseFloat(share);
        await safeUpdateUser(user.key, user.value, user.version);
    });
}
