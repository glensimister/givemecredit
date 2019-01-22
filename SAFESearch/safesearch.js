$(document).ready(function () {
    $('.fa-commenting').on('click', function () {
        $('#commentsBox').dialog({
            draggable: true,
            width: "auto"
        });
    })
});
