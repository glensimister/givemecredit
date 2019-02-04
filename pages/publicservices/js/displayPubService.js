$(async function () {

    let items = [];
    items = await safe_listOfficials();
    if (items.length == 0) {
        console.log("There are no services");
    } else {
        items.forEach(async(item) => {
            if (item.value.elected) {
                var pOfTarget = item.value.percentageOfTarget;
                var percentage = item.value.percentageOfTarget.split('%');
                percentage = parseInt(percentage[0]);
                if (percentage > 100) {
                    pOfTarget = '100%';
                }
                var publicService = `<div id="${item.key}">
                <h3><a href="#/voting/html/profile?id=${item.key}">${item.value.position}</a></h3>
                <ul class="funds-raised">
                    <li>
                        Official<b class="pull-right"><a href="#/voting/html/profile?id=${item.key}">${item.value.name}</a></b>
                    </li>
                    <li>
                        Monthly target<b class="pull-right"><span class="monthlyTarget">2000</span> IDX</b>
                    </li>
                    <li>
                        Raised so far<b class="pull-right"><span class="creditsReceived">${item.value.creditsReceived}</span> IDX</b>
                    </li>
                </ul>
                <div class="progress-bar">
                    <div style="width: 0;">
                    </div>
                </div>
                <select class="form-control">
                    <option>Social Credits</option>
                    <option>Health Credits</option>
                    <option>Education Credits</option>
                    <option>C20 - Crypto20 (Index Fund)</option>
                    <option>BTC - Bitcoin</option>
                    <option>ETH - Ethereum</option>
                    <option>LTC - Litecoin</option>
                    <option>DASH - Dash</option>
                </select>
                <br />
                <div class="grid-input-button">
                    <div><input type="text" class="form-control donate-input"></div>
                    <div><button type="button" title="${item.value.pubKey}" id="${item.key}" class="donate-sc">DONATE</button></div>
                </div>
            </div>`;
                $('.localServices').prepend(publicService);
                $('#' + item.key + ' .progress-bar div').animate({'width':pOfTarget},400, function(){
                    $('#' + item.key + ' .creditsReceived').addClass('animated flash');
                });
                
            }
        });
    }
});
