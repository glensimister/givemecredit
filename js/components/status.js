import {
    getDate
} from './getDate.js';

export function status() {
    $(document.body).on('click', '.post-update button', function () {
        var update = $('.status-update input').val();
        updateStatus(update, this, true); //no need for 'this' or 'true' anymore [will remove]
    });

    $('.status-checkbox').on("click", function () {
        if ($(this).hasClass('checked')) {
            $(this).html('');
            $(this).removeClass('checked');
        } else {
            $(this).html('&#10004;');
            $(this).addClass('checked');
        }
    });

    async function updateStatus(post, $this, isStatusUpdate) {
        let date = await getDate();
        gun.get('users').once(function (data) {
            gun.get('pub/' + data.pubKey).once(function (result) {
                let template = `
                <div class="post">
                    <div class="post-body">
                    <img src="${result.photo}" class="user-image-medium" alt="User Image">
                    <span><a href="">${result.name}</a><br />${date}</span>
                    <div class="post-desc">${post}</div></div>
                    <div class="grid-toolbar">
                        <div class="red"><i class="fa fa-thumbs-o-up"></i></div>
                        <div>90</div>
                        <div class="blue"><i class="fa fa-thumbs-o-down"></i></div>
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
                     <div class="post-comment">
                    </div>
                    <input type="text" class="post-comment-input" placeholder="Write a comment..." />
                </div>`;
                $('.post-feed').prepend(template);
                $(".rateYoToolbar").rateYo({
                    rating: 4,
                    starWidth: "15px",
                    readOnly: true
                });
            });
        });
    }
}
