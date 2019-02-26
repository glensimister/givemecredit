$(async function () {
    $('.profile-summary img.user-image-large ').attr("src", webIdImg);
    $('.profile-pic-small').attr("src", webIdImg);
    $('.profile-summary h4#fullName').html(webIdName);
    $(".rateYo").rateYo({
        rating: 3.6,
        fullStar: true,
        starWidth: "20px",
        readOnly: true
    });

    let users = [];
    users = await safe_getUsers();
    users.forEach(async(user) => {
        let str = webId.localeCompare(user.value.webID);
        if (str == 0) {
            $('.sc div').html(parseFloat(user.value.socialCredits).toFixed(2));
            $('.hc div').html(user.value.healthCredits);
            $('.ec div').html(user.value.educationCredits);
            let balance = await safe_getBalance(user.value.pubKey);
            $('.rebate div').html(balance);
        }
    });
});
