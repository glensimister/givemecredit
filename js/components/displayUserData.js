export async function displayUserData() {
    //if (data === undefined) window.location.replace("login.html"); from old version
    const profileImg = await window.currentWebId["#me"]["image"]["@id"];
    const profileName = await window.currentWebId["#me"]["name"];
    $('.profile-summary img.user-image-large ').attr("src", profileImg);
    $('.profile-pic-small').attr("src", profileImg);
    $('.profile-summary h4#fullName').html(profileName);
    $(".rateYo").rateYo({
        rating: 3.6,
        fullStar: true,
        starWidth: "20px",
        readOnly: true
    });
}
