export function applyAsCandidate() {
    $(document.body).on("click", '.apply-for-position', function (e) {
        e.stopImmediatePropagation();
        $('#tab2').prop('checked', true);
        var position = $('.candidate-position').val();
        gun.get('users').once(function (data) {
            gun.get('pub/' + data.pubKey).once(function (result) {
                var candidate = {
                    id: data.pubKey,
                    name: result.name,
                    photo: result.photo,
                    position: position,
                    elected: false,
                    approvalRating: "0%",
                    upVotes: 0,
                    downVotes: 0
                }
                gun.get('candidates').set(candidate);
                gun.get('services').set({
                    id: data.pubKey,
                    service: position,
                    owner: result.name,
                    isElected: false,
                    creditsReceived: 0
                });
            });
        });
    });
}
