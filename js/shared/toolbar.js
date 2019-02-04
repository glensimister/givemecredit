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
