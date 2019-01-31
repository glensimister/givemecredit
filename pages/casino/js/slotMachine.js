// uses roulette.js (in vendor folder)  
$(async function () {
    const webId = await window.currentWebId["@id"];
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
                } else {
                    lose.play();
                    //100 is current cost of a play. However, this will be based on user input.
                    distributeSocCredits(1000);
                }
                updateCredits(isWinner, payout);
                $('.result div').addClass('animated heartBeat').html(result);
                $('.fa-star-o').addClass('animated rotateIn');
                updateSafeCoinBal();
            }
        }
    }
    
    async function showSafeCoinBalances() {
        let accounts = [];
        accounts = await getAllBalances();
        accounts.forEach(async(account) => {
            console.log(account);
        });
    }
    

    async function updateSafeCoinBal() {
        // update safecoin balance with newSafeCoinBal
        let pubKey = await getUserPubKeyFromWebId(webId);
        console.log(pubKey + " " + newSafeCoinBal);
        let accounts = [];
        accounts = await getAllBalances();
        accounts.forEach(async(account) => {            
            let str = pubKey.localeCompare(account.value.pubKey);
            if (str == 0) {
                account.value.balance = newSafeCoinBal;
                updateBalance(account.key, account.value, account.version);
            }
        });
        showSafeCoinBalances();
    }

    function updateCredits(isWin, amount) {
        let element = $('.rebate div');
        let current_bal;
        current_bal = element.html();
        if (isWin) {
            newSafeCoinBal = parseFloat(current_bal) + amount;
            element.html(newSafeCoinBal);
            element.addClass('animated win-color heartBeat');
            setTimeout(function () {
                element.removeClass();
            }, 2000);
        } else {
            newSafeCoinBal = parseFloat(current_bal) - amount;
            element.html(newSafeCoinBal);
            element.removeClass();
        }
    }

    var rouletter1 = $('div.roulette1');
    var rouletter2 = $('div.roulette2');
    var rouletter3 = $('div.roulette3');

    rouletter1.roulette(option1);
    rouletter2.roulette(option2);
    rouletter3.roulette(option3);
    
    /**** don't need stop anymore. can remove *****/

    $('.stop').click(function () {
        var stopImageNumber = $('.stopImageNumber').val();
        if (stopImageNumber == "") {
            stopImageNumber = null;
        }
        rouletter1.roulette('stop');
        rouletter2.roulette('stop');
        rouletter3.roulette('stop');
    });

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

        if ((imgNum1 == imgNum2) && (imgNum1 == imgNum3)) {
            result = "JACKPOT!";
            isWinner = true;
            payout = 100;
        } else if (imgNum1 == imgNum2) {
            result = "YOU WIN!";
            isWinner = true;
            payout = 20;
        } else {
            result = "YOU LOSE!";
            isWinner = false;
            payout = 20;
        }

        rouletter1.roulette('start');
        rouletter2.roulette('start');
        rouletter3.roulette('start');

    });
});
