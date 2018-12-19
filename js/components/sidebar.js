export function sidebar(){
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
} 