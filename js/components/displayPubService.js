export function displayPubService() {
    gun.get('services').map().once(function (data, key) {
        if (data.isElected === true) {
            var publicService = `<div id=${data.id}>
                <i class="fa fa-times delete"></i>
                <h3><a href="#/profile?id=${data.id}">${data.service}</a></h3>
                <ul class="funds-raised">
                    <li>
                        Official<b class="pull-right"><a href="#/profile?id=${data.id}">${data.owner}</a></b>
                    </li>
                    <li>
                        Monthly target<b class="pull-right"><span class="monthlyTarget">200</span> IDX</b>
                    </li>
                    <li>
                        Raised so far<b class="pull-right"><span class="creditsReceived">${data.creditsReceived}</span> IDX</b>
                    </li>
                </ul>
                <div class="progress-bar">
                    <div style="width: 60%;">
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
                    <div><button type="button" title="${data.id}" class="donate-sc">DONATE</button></div>
                </div>
            </div>`;
            $('.localServices').prepend(publicService);
        }
    });
}
