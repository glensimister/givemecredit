export function education() {
    $(".rateYoLeft").rateYo({
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
}