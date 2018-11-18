;
(function ($) {

    var app = $.sammy(function () {

        this.get('/', function () {
            getPage("pages/home.html");
        });

        this.get('/index.html', function () {
            getPage("pages/home.html");
        });

        this.get('#/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var page = this.params['page'];
            $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
            getPage('pages/' + this.params['page'] + '.html');
        });

        this.get('#/:folder/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var folder = this.params['folder'];
            var page = this.params['page'];
            $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
            getPage('pages/' + this.params['folder'] + '/' + this.params['page'] + '.html');
        });
    });

    $(function () {
        app.run()
    });

    function getPage(url) {
        $.ajax({
            url: url,
            success: function (result) {
                $(".content").hide().html(result).fadeIn();
                $.getScript("js/initializeplugins.js");
                $.getScript("js/main.js");
            }
        });
        $(window).scrollTop(0);
    }
})(jQuery);
