$(document).ready(function () {
    $(".rateYo").rateYo({
        rating: 3,
        fullStar: true,
        starWidth: "20px",
        readOnly: true
    });

    $(".rateYoCourse").rateYo({
        rating: 0,
        fullStar: true,
        starWidth: "20px",
        readOnly: false
    });

    $(".rateYoLeft").rateYo({
        rating: 3,
        fullStar: true,
        starWidth: "20px",
        readOnly: true
    });

    $(".rateYoToolbar").rateYo({
        rating: 4,
        starWidth: "15px",
        readOnly: true
    });

    $(".rateYoAlignLeft").rateYo({
        rating: 3.6,
        starWidth: "20px",
        readOnly: true
    });

    $('.select2').select2();
});
