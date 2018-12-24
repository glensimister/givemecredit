export function getProfile() {
    
    var id = getUrlVars()["id"];
    
        gun.get('candidates').map().on(function (data) {
            if (data.id === id) {
                $('.profile-summary h4').html(data.position);
                $('.profile-summary img').attr("src", data.photo);
                $('.profile-summary ul li a.fullname').html(data.name);
                $('.profile-summary ul li a.approval-rating').html(data.approvalRating);
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
