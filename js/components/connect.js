export function connect() {
    $(document.body).on('click', '.connect, .disconnect', function (e) {
        e.stopImmediatePropagation();
        if ($(this).hasClass("disconnect")) {
            $(this).text("CONNECT");
            $(this).removeClass('disconnect');
        } else {
            $(this).text("DISCONNECT");
            $(this).addClass('disconnect');
        }
    });
}
