var percent = 0,
    bar = $('.transition-timer-carousel-progress-bar'),
    crsl = $('#carousel-example-generic');

function progressBarCarousel() {
    bar.css({
        width: percent + '%'
    });
    percent = percent + 0.5;
    if (percent > 100) {
        percent = 0;
        crsl.carousel('next');
    }
}


var barInterval = setInterval(progressBarCarousel, 10);
crsl.carousel({
    interval: false,
    pause: true
}).on('slid.bs.carousel', function () {
    var totalItems = $('.item').length;
    var currentIndex = $('div.active').index() + 1;
    if (currentIndex == (totalItems)) {
        clearInterval(barInterval);
    }
});

crsl.hover(
    function () {
        clearInterval(barInterval);
    },
    function () {
        var totalItems = $('.item').length;
        var currentIndex = $('div.active').index() + 1;
        if (currentIndex != (totalItems)) {
            barInterval = setInterval(progressBarCarousel, 10);
        }
    });