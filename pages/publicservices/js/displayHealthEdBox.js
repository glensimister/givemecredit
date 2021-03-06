/****** display the health and education credits boxes on the public services page ******/

$(async function () {
    let items = [];
    items = await safe_getUsers();
    items.forEach(async(item) => {
        let str = webId.localeCompare(item.value.webId);
        if (str == 0) {
            let percentHealth = (item.value.healthCredits / 1000) * 100;
            let percentEd = (item.value.educationCredits / 1000) * 100;
            
            let healthCreditsBox = `<div id="${item.key}-hc">
        <h3>Health Credits</h3>
        <ul class="funds-raised">
            <li>
                Official<b class="pull-right">N/A</b>
            </li>
            <li>
                Max Threshold<b class="pull-right"><span class="monthlyTarget">1000</span> SFC</b>
            </li>
            <li>
                Current Balance<b class="pull-right"><span class="creditsReceived">${item.value.healthCredits}</span> SFC</b>
            </li>
        </ul>
        <div class="progress-bar">
            <div style="width: ${percentHealth}%;">
            </div>
        </div>
        <select class="form-control">
            <option>Social Credits</option>
            <option>SafeCoin</option>
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
            
            let edCreditsBox = `<div id="${item.key}-ec">
        <h3>Education Credits</h3>
        <ul class="funds-raised">
            <li>
                Official<b class="pull-right">N/A</b>
            </li>
            <li>
                Max Threshold<b class="pull-right"><span class="monthlyTarget">1000</span> SFC</b>
            </li>
            <li>
                Current Balance<b class="pull-right"><span class="creditsReceived">${item.value.educationCredits}</span> SFC</b>
            </li>
        </ul>
        <div class="progress-bar">
            <div style="width: ${percentEd}%;">
            </div>
        </div>
        <select class="form-control">
            <option>Social Credits</option>
            <option>SafeCoin</option>
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
