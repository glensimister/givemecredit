async function displayUserData() {
    const id = await window.currentWebId["@id"];
    const img = await window.currentWebId["#me"]["image"]["@id"];
    const name = await window.currentWebId["#me"]["name"];
    $('.profile-summary img.user-image-large ').attr("src", img);
    $('.profile-pic-small').attr("src", img);
    $('.profile-summary h4#fullName').html(name);
    $(".rateYo").rateYo({
        rating: 3.6,
        fullStar: true,
        starWidth: "20px",
        readOnly: true
    });

    let users = [];
    users = await listUsers();
    users.forEach(async(user) => {
        let str = id.localeCompare(user.value.webID);
        if (str == 0) {
            $('.sc div').html(parseFloat(user.value.socialCredits).toFixed(2));
            $('.hc div').html(user.value.healthCredits);
            $('.ec div').html(user.value.educationCredits);
            let balance = await getBalance(user.value.pubKey);
            $('.rebate div').html(balance);
        }
    });
}
