import {
    getDate
}
from '../general/getDate.js';

//currently the code below only works on the first comment. Also, it doesn't write to the db yet. 

export default (function () {
    $(document.body).on("keypress", '.post-comment-input', async function (e) {
        e.stopImmediatePropagation();
        //const usrId = await window.currentWebId["@id"];
        const img = await window.currentWebId["#me"]["image"]["@id"];
        const name = await window.currentWebId["#me"]["name"];
        let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let comment = $('.post-comment-input').val();
        let date = await getDate();
        if (e.which == 13 && comment != '') {
            let template = `<div class="comment-box">
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
            $(this).prev().append(template);
            $('.post-comment-input').val("");
            $(".rateYoToolbar").rateYo({
                rating: 4,
                starWidth: "15px",
                readOnly: true
            });
        }
    });
}());
