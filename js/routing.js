/***** page routing with sammy.js *****/

function initializePageRouting() {

    function loadHomePage() {
        $('.sidebar ul li a.active').removeClass('active');
        $(".content").load("pages/home/index.html", function () {
            $.getScript("pages/home/index.js");
            initializePlugins();
        });
    }

    var app = $.sammy(function () {
        this.get('#/', function () {
            loadHomePage()
        });
        this.get('/index.html', function () {
            loadHomePage()
        });
        this.get('/', function () {
            loadHomePage()
        });
        this.get('#/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var page = this.params['page'];
            let pageUrl = 'pages/' + page + '.html';
            $(".content").load(pageUrl, function () {
                $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
                initializePlugins();
            });
        });
        this.get('#/:folder/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var folder = this.params['folder'];
            var page = this.params['page'];
            let pageUrl = 'pages/' + folder + '/' + page + '.html';
            let scriptUrl = 'pages/' + folder + '/index.js';
            $(".content").load(pageUrl, function () {
                $.getScript(scriptUrl);
                $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
                initializePlugins();
            });
        });
        this.get('#/:folder/:subfolder/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            var folder = this.params['folder'];
            var subfolder = this.params['subfolder'];
            var page = this.params['page'];
            let pageUrl = 'pages/' + folder + '/' + subfolder + '/' + page + '.html';
            let scriptUrl = 'pages/' + folder + '/index.js';
            $(".content").load(pageUrl, function () {
                $.getScript(scriptUrl);
                $('.sidebar').find('a[href="#/' + folder + '/' + page + '"]').addClass('active');
                initializePlugins();
            });
        });
    });

    $(function () {
        app.run()
    });
}
