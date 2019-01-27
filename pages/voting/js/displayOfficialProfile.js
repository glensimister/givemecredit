async function displayOfficialProfile() {
    var id = getUrlVars()["id"];
    let items = [];
    items = await listOfficials();
    items.forEach(async(item) => {
        if (item.key == id) {
            $('.profile-summary h4').html(item.value.position);
            $('.profile-summary img').attr("src", item.value.photo);
            $('.profile-summary ul li a.fullname').html(item.value.name);
            $('.profile-summary ul li a.approval-rating').html(item.value.approvalRating);
            $(".rateYo").rateYo({
                rating: item.value.approvalRating,
                starWidth: "20px",
                readOnly: true
            });
        }
    });

    function getUrlVars() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
}
