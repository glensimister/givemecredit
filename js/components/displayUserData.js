import {
    listUsers
}
from './safenetwork.js';

export async function displayUserData() {
    //if (data === undefined) window.location.replace("login.html"); from old version
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
        if (user.webID == id) {
            console.log(user.value.socialCredits);
            $('.sc').html(user.value.socialCredits);
            $('.hc').html(user.value.healthCredits);
            $('.ec').html(user.value.educationCredits);
        }
    });
}
