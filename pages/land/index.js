console.log('land page');

/**** TO DO...everything ****/

$(document.body).on('click', '.submit-plot', async function (e) {
    e.stopImmediatePropagation();
    let landPostCode = $('.land-post-code').val();
    let landSize = $('.land-size').val();
    let landPrice = $('.land-price').val();
    let propertyAttached = $('.property-attached:checked').val();
    let mainsWater = $('.mains-water:checked').val();
    let mainsElectricity = $('.mains-electricity:checked').val();
    let landPhotoUrl = $('.land-photo:checked').val();
    let landDescription = $('.land-desciption').val();
    console.log(landPostCode + "/" + landSize + "/" + landPrice + "/" + propertyAttached + "/" + mainsWater + "/" + mainsElectricity + "/" + landPhotoUrl + "/" + landDescription);
});
