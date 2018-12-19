export function applyAsCandidate() {
    $(document.body).on("click", '.apply-for-position', function (e) {
        e.stopImmediatePropagation();
        $('#tab2').prop('checked', true);
        var position = $('.candidate-position').val();
        gun.get('users').once(function (data) {
            gun.get('pub/' + data.pubKey).once(function (result) {
                console.log("apply: " + result);
                var candidate = {
                    id: result.id,
                    name: result.name,
                    photo: result.photo,
                    position: position,
                    rating: "0%",
                    upVotes: 0,
                    downVotes: 0
                }
                gun.get('candidates').set(candidate);
            });
        });
    });
}