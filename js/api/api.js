var gun = Gun()

var api = {
    updateStatus: function () {
        var posts = gun.get('posts')
        var post = $('.status-update input').val();
        posts.put({
            post: post
        })

        posts.once(function (data) {
            var status_update = {
                post: data.post
            };
            var template = $('#postTpl').html();
            var html = Mustache.to_html(template, status_update);
            $('.post-feed').prepend(html);
            $(".rateYoToolbar").rateYo({
                rating: 4,
                starWidth: "15px",
                readOnly: true
            });
        })
    },
    distributeCredits: function () {
        var credits = gun.get('credits')
        credits.put({
            social: "240", //these are dummy values
            health: "50",
            education: "0"
        })
        credits.once(function (data) {
            $('.sc').html(data.social);
            $('.hc').html(data.health);
            $('.ec').html(data.education);
        })
    },
    donateSocialCredits: function ($this) {
        var input = $($this).parent().parent().find('input').val();
        var select = $($this).parent().parent().parent().parent().find('select option:selected').val();
        var parent_class = $($this).parent().parent().parent().parent().attr('class');

        if (parent_class == 'topup-hc') {
            if (select == 'Social Credits') {
                transferCredits('.sc', '.hc', input);
            } else if (select == 'Education Credits') {
                transferCredits('.ec', '.hc', input);
            }
        } else if (parent_class == 'topup-ec') {
            transferCredits('.sc', '.ec', input);
        } else if (select == 'Social Credits') {
            deductCredits('.sc', input);
        } else if (select == 'Health Credits') {
            deductCredits('.hc', input);
        } else if (select == 'Education Credits') {
            deductCredits('.ec', input);
        };

        function transferCredits(from, to, amount) {
            var type_from = $(from).html();
            type_from = (parseInt(type_from) - parseInt(amount));
            $(from).html(type_from.toFixed(0));
            var type_to = $(to).html();
            type_to = (parseInt(type_to) + parseInt(amount));
            $(to).html(type_to.toFixed(0));
        }

        function deductCredits(type, amount) {
            var current_value = $(type).html();
            var new_value = (parseInt(current_value) - parseInt(amount));
            $(type).html(new_value.toFixed(0));
            payRebate(amount);
        }

        function payRebate(amount) {
            var rebate = 10 / 100 * amount;
            var result = 0;
            result = $('.rebate').text();
            result = rebate + parseInt(result);
            $('.rebate').html(result.toFixed(0));
        }
    },
    buyLotteryTicket: function ($this) {
        var amount = $($this).parent().prev().find('input').val();
        amount = amount * 10; //this is the price of a lottery ticket - although it is completely arbitrary
        var sc = $('.sc').html();
        var new_sc = (parseInt(sc) + parseInt(amount));
        $('.sc').html(new_sc);
    },
    loadSolidProfile: async function () {
        const FOAF = $rdf.Namespace('http://xmlns.com/foaf/0.1/');

        // Set up a local data store and associated data fetcher
        const store = $rdf.graph();
        const fetcher = new $rdf.Fetcher(store);



        // Load the person's data into the store
        const person = $('#profile').val();
        await fetcher.load(person);

        // Display their details
        const fullName = store.any($rdf.sym(person), FOAF('name'));
        $('.profile-summary h4#fullName').text(fullName && fullName.value);

        const me = $rdf.sym(person);
        const VCARD = new $rdf.Namespace('http://www.w3.org/2006/vcard/ns#');
        let picture = store.any(me, VCARD('hasPhoto'));
        $('.profile-summary img').attr("src", picture.value);

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
    }
}
