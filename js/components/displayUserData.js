export function displayUserData() {
    gun.get('users').once(function (data) {
        if (data === undefined) {
            window.location.replace("login.html");
        } else {
            gun.get('pub/' + data.pubKey).once(function (result) {
                $('.profile-summary h4#fullName').html(result.name);
                $('.profile-summary img.user-image-large ').attr("src", result.photo);
                $('.profile-pic-small').attr("src", result.photo);
                //$('.profile-summary ul li a.voteWeight').html(result.voteWeight);
                //$('.profile-summary ul li a.age').html(result.age);
                //$('.profile-summary ul li a.edScore').html(result.educationScore);
                //$('.profile-summary ul li a.socialRating').html(result.socialRating);
                //$('.profile-summary ul li a.connections').html(result.connections);
            });
            $(".rateYo").rateYo({
                rating: 3.6,
                fullStar: true,
                starWidth: "20px",
                readOnly: true
            });
        }
    });
}
