/****** display the health and education credits boxes on the public services page ******/

$(async function () {
    const id = await window.currentWebId["@id"];
    let items = [];
    items = await safe_getUsers();
    items.forEach(async(item) => {
        let str = id.localeCompare(item.value.webID);
        if (str == 0) {
            let percentHealth = (item.value.healthCredits / 1000) * 100;
            let percentEd = (item.value.educationCredits / 1000) * 100;
            
            let healthCreditsBox = `<div id="${item.key}-hc" class="animated slideInUp">
        <h3>Health Credits</h3>
        <ul class="funds-raised">
            <li>
                Official<b class="pull-right">N/A</b>
            </li>
            <li>
                Max Threshold<b class="pull-right"><span class="monthlyTarget">1000</span> IDX</b>
            </li>
            <li>
                Current Balance<b class="pull-right"><span class="creditsReceived">${item.value.healthCredits}</span> IDX</b>
            </li>
        </ul>
        <div class="progress-bar">
            <div style="width: ${percentHealth}%;">
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
                <button type="button" title="${item.key}-hc" class="topup-hc">DONATE</button>
            </div>
        </div>
    </div>`;
            
            let edCreditsBox = `<div id="${item.key}-ec" class="animated slideInUp">
        <h3>Education Credits</h3>
        <ul class="funds-raised">
            <li>
                Official<b class="pull-right">N/A</b>
            </li>
            <li>
                Max Threshold<b class="pull-right"><span class="monthlyTarget">1000</span> IDX</b>
            </li>
            <li>
                Current Balance<b class="pull-right"><span class="creditsReceived">${item.value.educationCredits}</span> IDX</b>
            </li>
        </ul>
        <div class="progress-bar">
            <div style="width: ${percentEd}%;">
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
                <button type="button" title="${item.key}-ec" class="topup-ec">DONATE</button>
            </div>
        </div>
    </div>`;
            
            $('.localServices').append(healthCreditsBox + edCreditsBox);
        }
    });
});
