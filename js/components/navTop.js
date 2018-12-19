export function navTop() {
   $('.top-nav ul li.has-dropdown > a').click('click', function (e) {
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
} 
