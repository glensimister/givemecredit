$(document).ready(function () {

    const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

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
            loadProfile();
        } else {
            /*window.location.replace("http://localhost:8000/signin.html");*/
        }
    });

    loadProfile();
    async function loadProfile() {
        // Set up a local data store and associated data fetcher
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store);

        // Load the person's data into the store
        const person = $('#profile').val();
        await fetcher.load(person);

        // Display their details
        const fullName = store.any($rdf.sym(person), FOAF('name'));
        const img = store.any($rdf.sym(person), FOAF('image'));
        console.log(img);
        $('.profile-summary h4#fullName').text(fullName && fullName.value);

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
    };

    $(document.body).on('click', '.pay-tax', function () {
        api.distributeCredits();
    });

    $(document.body).on('click', '.donate-sc', function (e) {
        e.stopImmediatePropagation();
        api.donateSocialCredits(this);
    });

    $(document.body).on('click', '.buy-ticket', function (e) {
        e.stopImmediatePropagation();
        api.buyLotteryTicket(this)
    });

    $('.status-checkbox').click(function () {
        $(this).html('&#10004;');
    });

    $('.connect, .disconnect').click(function () {
        if ($(this).hasClass("disconnect")) {
            $(this).text("CONNECT");
            $(this).removeClass('disconnect');
        } else {
            $(this).text("DISCONNECT");
            $(this).addClass('disconnect');
        }
    });

    $('.sidebar ul li .treeview_a').click(function (e) {

        e.stopImmediatePropagation();
        $(this).toggleClass("open").next().slideToggle('fast');
        $(this).find('i').toggleClass('rotate-angle');

        /* There seems to be a small bug in this. Uncomment and test the menu...*/
        if ($(this).hasClass('open')) {
            /*$('ul.treeview-menu').not($(this).next()).slideUp('fast');*/
            var ulHeight = $(this).next()[0].scrollHeight;
            $('.sidebar').animate({
                'top': '-' + ulHeight
            }, 500);
        } else {
            /*$('.sidebar').find('i').not($(this).find('i')).toggleClass('rotate-angle');*/
            $('.sidebar').animate({
                'top': '0'
            }, 500);
        };
    });

    $('.top-nav ul li.has-dropdown > a').click(function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).parent().siblings().find('.dropdown-content').hide();
        $(this).parent().find('.dropdown-content').fadeToggle('fast');
        close_dropdown(true);
    });

    function close_dropdown(is_dropdown_open) {
        $('body').click(function (e) {
            e.stopImmediatePropagation();
            if (is_dropdown_open) {
                $('.dropdown-content').fadeOut('slow');
            }
        });
    }

    $('a.toggle-menu').click(function (e) {
        $('.sidebar ul:first-child').slideToggle('fast');
        e.stopImmediatePropagation();
    });

    $('.post-update button').click(function () {
        api.updateStatus();
    });

    $('.flag').click(function () {
        if ($(this).hasClass("blurred")) {
            $(this).parent().parent().find('.post-desc').css("filter", "blur(0px)");
            $(this).removeClass('blurred');
            $(this).find('span').text('Flag'); //need to update this
        } else {
            $(this).parent().parent().find('.post-desc').css("filter", "blur(4px)");
            $(this).addClass('blurred');
            $(this).find('span').text('Show'); //need to update this
        }
    });
});
