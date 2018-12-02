;
(function ($) {

    var app = $.sammy(function () {

        this.get('#/', function () {
            getPage("pages/home.html", function () {
                $.getScript("js/fns.gun.js", function () {
                    gunAPI.displayUserData();
                });
            });
        });

        this.get('/index.html', function () {
            getPage("pages/home.html", function () {
                $.getScript("js/fns.gun.js", function () {
                    gunAPI.displayUserData();
                });
            });
        });

        this.get('/', function () {
            getPage("pages/home.html", function () {
                $.getScript("js/fns.gun.js", function () {
                    gunAPI.displayUserData();
                });
            });
        });

        this.get('#/profile', function () {
            getPage("pages/profile.html", function () {
                $.getScript("js/fns.gun.js", function () {
                    gunAPI.getProfile();
                });
            });
        });

        this.get('#/:page', function () {
            var page = this.params['page'];
            getPage('pages/' + this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
        });

        this.get('#/:folder/:page', function () {
            var folder = this.params['folder'];
            var page = this.params['page'];
            if (page !== 'national') {
                getPage('pages/' + this.params['folder'] + '/' + this.params['page'] + '.html');
            } else {
                getPage(this.params['folder'] + '/' + this.params['page'] + '.html');
            }
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
        });

        this.get('#/:country/:region/:postcode/:page', function () {
            var country = this.params['country'];
            var region = this.params['region'];
            var postcode = this.params['postcode'];
            var page = this.params['page'];
            getPage(this.params['country'] + '/' + this.params['region'] + '/' + this.params['postcode'] + '/' +
                this.params['page'] + '.html');
            $('.sidebar').find('a[href="#/' + country + '/' + region + '/' + postcode + '/' + page + '"]').addClass('active');
        });
    });

    $(function () {
        app.run()
    });

    function getPage(url, cb) {
        $('.sidebar ul li a.active').removeClass('active');
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                $.getScript("js/initializeplugins.js");
                $.getScript("js/main.js");
            }
        });
        $(window).scrollTop(0);
        if (cb) cb();
    }
})(jQuery);
