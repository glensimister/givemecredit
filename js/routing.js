;
(function ($) {
    var app = $.sammy(function () {
        this.get('/', function () {
            $.ajax({
                url: "/pages/home.html",
                success: function (result) {
                    $(".content").hide().html(result).fadeIn();
                    $.getScript("/js/initializeplugins.js");
                    $.getScript("/js/main.js");
                }
            });
            $(window).scrollTop(0);
        });

        this.get('/index.html', function () {
            $.ajax({
                url: "/pages/home.html",
                success: function (result) {
                    $(".content").hide().html(result).fadeIn();
                    $.getScript("/js/initializeplugins.js");
                    $.getScript("/js/main.js");
                }
            });
            $(window).scrollTop(0);
        });

        this.get('#/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var page = this.params['page'];
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
            $.ajax({
                url: '/pages/' + this.params['page'] + '.html',
                success: function (result) {
                    $(".content").hide().html(result).fadeIn();
                    $.getScript("/js/initializeplugins.js");
                    $.getScript("/js/main.js");
                }
            });
            $(window).scrollTop(0);
        });

        this.get('#/:folder/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var folder = this.params['folder'];
            var page = this.params['page'];
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');

            $.ajax({
                url: '/pages/' + this.params['folder'] + '/' + this.params['page'] + '.html',
                success: function (result) {
                    $(".content").hide().html(result).fadeIn();
                    $.getScript("/js/initializeplugins.js");
                    $.getScript("/js/main.js");
                }
            });
            $(window).scrollTop(0);
        });
    });

    $(function () {
        app.run()
    });

})(jQuery);
