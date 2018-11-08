$(document).ready(function () {
    console.log(window.location.hostname);
    if (window.location.hostname != "localhost") {
        Toolbar.init();
        $(".rateYoToolbar").rateYo({
            rating: 4,
            starWidth: "15px",
            readOnly: true
        });
    }
})
