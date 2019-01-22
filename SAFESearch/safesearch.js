$(document).ready(function () {
    $('.fa-commenting').on('click', function () {
        $('#commentsBox').dialog({
            title: "Comments",
            draggable: true,
            width: "auto"
        });
    });

    $('.user-image-small').on('click', function () {
        $('.profile-summary').dialog({
            title: "Author",
            draggable: false,
            width: "300px"
        });
        $(".rateYo").rateYo({
            rating: 3.6,
            fullStar: true,
            starWidth: "20px",
            readOnly: true
        });
    });
});
