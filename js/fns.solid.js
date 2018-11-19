var solidAPI = {
    solidLogin: () => {
        // Log the user in and out on click
        const popupUri = 'popup.html';
        $('#login  button').click(() => solid.auth.popupLogin({
            popupUri
        }));
        $('#logout button').click(() => solid.auth.logout());

        // Update components to match the user's login status
        solid.auth.trackSession(session => {
            const loggedIn = !!session;
            $('#login').toggle(!loggedIn);
            $('#logout').toggle(loggedIn);
            if (loggedIn) {
                $('#user').text(session.webId);
                // Use the user's WebID as default profile
                if (!$('#profile').val())
                    $('#profile').val(session.webId);
                solidAPI.loadSolidProfile();
            } else {
                $('.profile-summary h4#fullName').text("Guest User");
            }
        });
    },
    loadSolidProfile: async () => {
        const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');
        // Set up a local data store and associated data fetcher
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store);
        // Load the person's data into the store
        const person = $('#profile').val();
        await fetcher.load(person);
        // Display their details
        const me = $rdf.sym(person);
        const fullName = store.any(me, FOAF('name'));
        $('.profile-summary h4#fullName').text(fullName && fullName.value);
        const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
        let picture = store.any(me, VCARD('hasPhoto'));
        $('.profile-summary img').attr("src", picture.value);
        //let role = store.any(me, VCARD('role'));
        let note = store.any(me, VCARD('note'));
        $('.about').html(note.value);
        // Display their friends
        const friends = store.each($rdf.sym(person), FOAF('knows'));
        $('#friends').empty();
        friends.forEach(async (friend) => {
            await fetcher.load(friend);
            const fullName = store.any(friend, FOAF('name'));
            $('#friends').append(
                $('<li>').append(
                    $('<a>').text(fullName && fullName.value || friend.value)
                    .click(() => $('#profile').val(friend.value))
                    .click(loadProfile)));
        });

        let users = gun.get('users');
        users.put({
            picture: picture.value,
            name: fullName.value
        });
    }
}
