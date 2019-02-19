let toolbar = `<div class="red"><i class="fa fa-thumbs-o-up"></i></div>
                    <div>90</div>
                        <div class="blue"><i class="fa fa-thumbs-o-down"></i></div>
                        <div>10</div>
                        <div class="red"><i class="fa fa-flag"></i></div>
                        <div>0</div>
                        <div class="rateYoToolbar"></div>
                        <div>
                            <span class="sfc">SFC</span>
                        </div>
                    <div><input type="number" placeholder="1"></div>
                <div class="red"><i class="fa fa-heart"></i></div>`;


$(function () {
    $(document.body).on("click", '.fa-flag', function (e) {
        e.stopImmediatePropagation();
        flagPost($(this)); //this can be removed
    });

    function flagPost($this) {
        let elem = $this.parent().parent().parent().find('.post-desc');
        if ($this.hasClass("blurred")) {
            elem.css("filter", "blur(0px)");
            $this.removeClass('blurred');
        } else {
            ratePost($this);
            elem.css("filter", "blur(4px)");
            $this.addClass('blurred');
        }
    }

    function ratePost($this) {
        var elem = $this.parent().next();
        var count = elem.html();
        count++;
        elem.html(count);
    }

    $(".rateYoToolbar").rateYo({
        rating: 4,
        starWidth: "15px",
        readOnly: true
    });
});
