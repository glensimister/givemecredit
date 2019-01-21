import {
    distributeSocCredits
}
from './distributeSocCredits.js';

export function lottery($this) {
    $(document.body).on('click', '.buy-ticket', function (e) {
        e.stopImmediatePropagation();
        var amount = $(this).parent().prev().find('input').val();
        amount = amount * 100; //this is the price of a lottery ticket - although it is completely arbitrary
        var sc = $('.sc').html();
        var new_sc = (parseInt(sc) + parseInt(amount));
        distributeSocCredits(new_sc);
    });

    $(document.body).on('click', '.lucky-dip', function (e) {
        e.stopImmediatePropagation();
        var $this;
        for (var i = 0; i < 7; i++) {
            $this = $(this).parent().siblings().find('.number' + [i]);
            $this.val(Math.floor((Math.random() * 9) + 1));
        }
    });

    $(document.body).on('click', '.add-new-numbers', function (e) {
        e.stopImmediatePropagation();
        var lotteryNumbers = `<ul class="lottery-input">
            <li><button class="btn btn-red lucky-dip">LUCK DIP</button></li>
            <li><input type="text" class="number1" /></li>
            <li><input type="text" class="number2" /></li>
            <li><input type="text" class="number3" /></li>
            <li><input type="text" class="number4" /></li>
            <li><input type="text" class="number5" /></li>
            <li><input type="text" class="number6" /></li>
            <li><i class="fa fa-times"></i></li>
        </ul>`;
        $('.lottery-ticket-numbers').append(lotteryNumbers);
    });
}
