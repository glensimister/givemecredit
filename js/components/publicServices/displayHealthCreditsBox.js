export async function displayHealthCreditsBox() {
    let id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let healthCreditsBox = `<div id="${id}">
        <h3>Health Credits</h3>
        <ul class="funds-raised">
            <li>
                Official<b class="pull-right">N/A</b>
            </li>
            <li>
                Max Threshold<b class="pull-right"><span class="monthlyTarget">1000</span> IDX</b>
            </li>
            <li>
                Current Balance<b class="pull-right"><span class="creditsReceived">100</span> IDX</b>
            </li>
        </ul>
        <div class="progress-bar">
            <div style="width: 0%;">
            </div>
        </div>
        <select class="form-control">
            <option>Social Credits</option>
            <option>Education Credits</option>
            <option>C20 - Crypto20 (Index Fund)</option>
            <option>BTC - Bitcoin</option>
            <option>ETH - Ethereum</option>
            <option>LTC - Litecoin</option>
            <option>DASH - Dash</option>
        </select>
        <br />
        <div class="grid-input-button">
            <div>
                <input type="text" class="form-control donate-input">
            </div>
            <div>
                <button type="button" title="${id}" class="topup-hc">DONATE</button>
            </div>
        </div>
    </div>`;
 
    $('.localServices').hide().append(healthCreditsBox).fadeIn('slow');
}
