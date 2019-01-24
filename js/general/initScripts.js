export function initScripts() {
    $(".rateYoLeft").rateYo({
        rating: 3.6,
        starWidth: "20px",
        readOnly: true
    });

    $(".rateYo").rateYo({
        rating: 3.6,
        starWidth: "20px",
        readOnly: true
    });

    $(".rateYoCourse").rateYo({
        rating: 0,
        fullStar: true,
        starWidth: "20px",
        readOnly: false
    });

    $(".rateYoToolbar").rateYo({
        rating: 4,
        fullStar: true,
        starWidth: "15px",
        readOnly: true
    });

    $('.select2').select2();
}
