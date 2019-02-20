/***** page routing with sammy.js. Do i really need sammy.js? *****/

function initializePageRouting() {

    function loadHomePage() {
        $('.sidebar ul li a.active').removeClass('active');
        $(".content").load("pages/home/index.html", function () {
            $.getScript("pages/home/index.js");
            initializePlugins();
        });
        $(".breadcrumbs").html("");
    }
    
    function splitPageString(page){
        let res = page.split("-");
        if (res[1])
        return res[0]+ " " + res[1];
        else return page;
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
            let page = `pages/${this.params['page']}.html`;
            $(".content").load(page, function () {
                $('.sidebar').find('a[href="#/' + page + '"]').addClass('active');
                initializePlugins();
            });
            $(".breadcrumbs").html("");
        });
        this.get('#/:folder/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            let folder = this.params['folder'];
            let page = this.params['page'];
            let pageUrl = `pages/${folder}/${page}.html`;
            let scriptUrl = `pages/${folder}/index.js`;
            let menuItem = `a[href="#/${folder}/${page}"]`;
            $(".content").load(pageUrl, function () {
                $.getScript(scriptUrl);
                $('.sidebar').find('' + menuItem + '').addClass('active');
                initializePlugins();
            });
            $(".breadcrumbs").html("");
        });
        this.get('#/:folder/:subfolder/:page', function () {
            $('.sidebar ul li a.active').removeClass('active');
            let folder = this.params['folder'];
            let subfolder = this.params['subfolder'];
            var page = this.params['page'];
            let pageUrl = `pages/${folder}/${subfolder}/${page}.html`;
            let scriptUrl = `pages/${folder}/index.js`;
            let menuItem = `a[href="#/${folder}/${page}"]`;
            $(".content").load(pageUrl, function () {
                $.getScript(scriptUrl);
                $('.sidebar').find('' + menuItem + '').addClass('active');
                initializePlugins();
            });
            let backButton = `<div class="back" onclick="history.back()"><i class="fa fa-caret-left"></i><span>Back</span>|<span>${splitPageString(page)}</span></div>`;
            $(".breadcrumbs").html(backButton);
        });
    });

    $(function () {
        app.run()
    });
}
