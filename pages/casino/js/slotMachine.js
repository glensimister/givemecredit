// uses roulette.js 
$(async function () {
    let pubKey = await safe_getUserPubKeyFromWebId(webId);
    let init = $('.rebate div').html()
    $('.safeCoinBal').html(init);
    let imgNum1 = 0;
    let imgNum2 = 0;
    let imgNum3 = 0;
    let count = 1;
    let result = "";
    let isWinner = false;
    let payout = 0;
    let newSafeCoinBal;

    var coin = document.getElementById("coin");
    var spin = document.getElementById("spin");
    var win = document.getElementById("win");
    var lose = document.getElementById("lose");

    var option1 = {
        speed: 10,
        duration: 1,
        stopImageNumber: Math.floor((Math.random() * 6) + 1),
        startCallback: function () {
            spin.play();

        },
        slowDownCallback: function () {},
        stopCallback: function ($stopElm) {}
    }
    var option2 = {
        speed: 10,
        duration: 1,
        stopImageNumber: Math.floor((Math.random() * 6) + 1),
        startCallback: function () {},
        slowDownCallback: function () {},
        stopCallback: function ($stopElm) {}
    }
    var option3 = {
        speed: 10,
        duration: 1,
        stopImageNumber: Math.floor((Math.random() * 6) + 1),
        startCallback: function () {},
        slowDownCallback: function () {},
        stopCallback: function ($stopElm) {
            count++;
            if (count = 3) {
                if (isWinner) {
                    win.play();
                    safe_sendTo(pubKey, payout, function (newBal) {
                        console.log(newBal);
                        $('.rebate div').addClass('animated win-color heartBeat').html(newBal);
                        $('.safeCoinBal div').addClass('animated win-color heartBeat').html(newBal);
                        $('.result div').addClass('animated win-color heartBeat').html(result);
                        $('.fa-star-o').addClass('animated rotateIn');
                        setTimeout(function () {
                            $('.rebate div').removeClass();
                            $('.safeCoinBal div').removeClass();
                            $('.result div').removeClass();
                        }, 2000);
                    })
                } else {
                    lose.play();
                    distributeSocCredits(payout);
                }
            }
        }
    }

    var rouletter1 = $('div.roulette1');
    var rouletter2 = $('div.roulette2');
    var rouletter3 = $('div.roulette3');

    rouletter1.roulette(option1);
    rouletter2.roulette(option2);
    rouletter3.roulette(option3);

    $('.start').click(function () {
        if ($(this).hasClass('cheat')) { // this is for testing only and will be removed
            imgNum1 = 1;
            imgNum2 = 1;
            imgNum3 = 1;
        } else {
            option1['duration'] = 1;
            imgNum1 = Math.floor((Math.random() * 6) + 1);
            option2['duration'] = 2;
            imgNum2 = Math.floor((Math.random() * 6) + 1);
            option3['duration'] = 3;
            imgNum3 = Math.floor((Math.random() * 6) + 1);

        }

        option1['stopImageNumber'] = imgNum1;
        option2['stopImageNumber'] = imgNum2;
        option3['stopImageNumber'] = imgNum3;

        rouletter1.roulette('option', option1);
        rouletter2.roulette('option', option2);
        rouletter3.roulette('option', option3);

        $('.sc div').removeClass();
        $('.result div').removeClass().html("SPINNING...");
        $('.fa-star-o').removeClass('animated rotateIn');
        let pricePerSpin = $('.roulette_bottom_grid > div:nth-child(2) input').val();

        if ((imgNum1 == imgNum2) && (imgNum1 == imgNum3)) {
            result = "JACKPOT!";
            isWinner = true;
            payout = pricePerSpin * 100;
        } else if (imgNum1 == imgNum2) {
            result = "YOU WIN!";
            isWinner = true;
            payout = pricePerSpin * 20;
        } else {
            result = "YOU LOSE!";
            isWinner = false;
            payout = pricePerSpin;
        }

        rouletter1.roulette('start');
        rouletter2.roulette('start');
        rouletter3.roulette('start');

    });
});
