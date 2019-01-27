//currently the code below only works on the first comment. Also, it doesn't write to the db yet. 

function displayComment(img, name, comment, date, guid, element) {
    let template = `<div id="${guid}" class="comment-box">
                    <i class="fa fa-fw fa-close delete-post"></i>
                    <i id="${guid}" class="fa fa-fw fa-pencil edit-post"></i>
                        <div class="post-body">
                            <img src="${img}" class="user-image-medium" alt="User Image">
                            <span><a href="">${name}</a><br />${date}</span>
                            <div class="comment">${comment}</div>
                        </div>
                        <div class="grid-toolbar">
                            <div class="red"><i title="${guid}" class="fa fa-thumbs-o-up"></i></div>
                            <div>90</div>
                            <div class="blue"><i title="${guid}" class="fa fa-thumbs-o-down"></i></div>
                            <div>10</div>
                            <div class="red"><i class="fa fa-flag"></i></div>
                            <div>0</div>
                            <div class="rateYoToolbar"></div>
                            <div>
                                <select>
                                    <option>Bitcoin</option>
                                    <option>Crypto20</option>
                                    <option>Dash</option>
                                    <option>Ether</option>
                                </select>
                            </div>
                            <div><input type="number" placeholder="1"></div>
                            <div class="red"><i class="fa fa-heart"></i></div>
                        </div>
                    </div>`;
    $(element).prev().append(template);
    $('.post-comment-input').val("");
    $(".rateYoToolbar").rateYo({
        rating: 4,
        starWidth: "15px",
        readOnly: true
    });
}
