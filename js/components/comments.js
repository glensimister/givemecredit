import {
    getDate
} from './getDate.js';

export async function comments() {
    $(document.body).on("keypress", '.post-comment-input', function (e) {
        e.stopImmediatePropagation();
        let comment = $('.post-comment-input').val();
        if (e.which == 13 && comment != '') {
            postComment(comment, $(this));
        }
    });

    async function postComment(post, $this) {
        let date = await getDate();
        gun.get('users').once(function (data) {
            gun.get('pub/' + data.pubKey).once(function (result) {
                let template = `<div class="comment-box">
                        <div class="post-body">
                            <img src="${result.photo}" class="user-image-medium" alt="User Image">
                            <span><a href="">${result.name}</a><br />${date}</span>
                            <div class="post-desc">${post}</div>
                        </div>
                        <div class="grid-toolbar">
                            <div class="red"><i title="${result.id}-up" class="fa fa-thumbs-o-up"></i></div>
                            <div>90</div>
                            <div class="blue"><i title="${result.id}-down" class="fa fa-thumbs-o-down"></i></div>
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
                $this.prev().append(template);
                $('.post-comment-input').val("");
                $(".rateYoToolbar").rateYo({
                    rating: 4,
                    starWidth: "15px",
                    readOnly: true
                });
            });
        });
    }
}
