$(document).ready(function () {
    var sidebar = `
            <ul>
                <li><a href="#/legal/constitutionlocal"><span>Legal</span></a></li>
                <li><a href="#/voting/votelocal"><span>Voting</span></a></li>
                <li><a href="#/wallet"><span>Wallet</span></a></li>
                <li><a href="#/land/landandhousing"><span>Land</span></a>
                </li>
                <li>
                    <a href="#/housing/modularhousing">
                        <span>Housing</span>
                    </a>
                </li>

                <li>
                    <a href="#/publicservices/local">
                        <span>Fund Public Services</span>
                    </a>
                </li>
                <li>
                    <a href="#/healthcare/healthcare">
                        <span>Healthcare</span>
                    </a>
                </li>
                <li>
                    <a href="#/education/education">
                        <span>Education</span>
                    </a>
                </li>
                <li>
                    <a href="#/business/business">
                        <span>Business &amp; Employment</span>
                    </a>
                </li>
                <li>
                    <a href="#/lottery">
                        <span>Lottery</span>
                    </a>
                </li>
                <li>
                    <a href="#/forum">
                        <span>Forum</span>
                    </a>
                </li>
                <li>
                    <a href="#/news">
                        <span>News</span>
                    </a>
                </li>
                <li class="treeview">
                    <a class="treeview_a" href="#/plugins/plugins">
                        <span>Plugins</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu" style="display: none;">
                        <li><a href="#/plugins/plugins">
                                <span>Manage Plugins</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/plugins/uploadPlugin">
                                <span>Upload Plugin</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Reports</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Dating</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Classified Ads</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Ride Share</span>
                            </a>
                        </li>
                    </ul>
                </li>

                <li class="treeview">
                    <a class="treeview_a" href="#/documentation/intro">
                        <span>Documentation</span>
                        <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu" style="display: none;">
                        <li><a href="#/documentation/intro">
                                <span>Introduction</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/profile">
                                <span>Profiles</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/crypto">
                                <span>Cryptocurrencies</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/credits">
                                <span>Credits</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/democracy">
                                <span>Democracy</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/LVT">
                                <span>Land Value Taxation (LVT)</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/housing">
                                <span>Housing</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/publicservices">
                                <span>Public Services</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/education">
                                <span>Education</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/business">
                                <span>Business &amp; Employment</span>
                            </a>
                        </li>
                        <li>
                            <a href="#/documentation/intro">
                                <span>Plugins</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>`;

    $('.sidebar').html(sidebar);
    $(document.body).on('click', 'a.toggle-menu', function (e) {
        $('.sidebar ul:first-child').slideToggle('fast');
        e.stopImmediatePropagation();
    });
    $(document.body).on("click", '.sidebar ul li .treeview_a', function (e) {

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
        }
    });
});
