import {
    listOfficials
}
from './safenetwork.js';

export async function displayPubService() {
    let items = [];
    items = await listOfficials();
    if (items.length == 0) {
        console.log("There are no services");
    } else {
        items.forEach(async(item) => {
            var pOfTarget = item.value.percentageOfTarget;
            var percentage = item.value.percentageOfTarget.split('%');
            percentage = parseInt(percentage[0]);
            if (percentage > 100) {
                pOfTarget = '100%';
            }
            var publicService = `<div id="${item.key}">
                <h3><a href="#/profile?id=${item.key}">${item.value.position}</a></h3>
                <ul class="funds-raised">
                    <li>
                        Official<b class="pull-right"><a href="#/profile?id=${item.key}">${item.value.name}</a></b>
                    </li>
                    <li>
                        Monthly target<b class="pull-right"><span class="monthlyTarget">200</span> IDX</b>
                    </li>
                    <li>
                        Raised so far<b class="pull-right"><span class="creditsReceived">${item.value.creditsReceived}</span> IDX</b>
                    </li>
                </ul>
                <div class="progress-bar">
                    <div style="width: ${pOfTarget};">
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
                    <div><button type="button" title="${item.key}" id="${item.key}" class="donate-sc">DONATE</button></div>
                </div>
            </div>`;
            $('.localServices').prepend(publicService);
        });
    }



  /*  gun.get('services').map().once(function (data, key) {
        if (data.isElected === true) {
            //will move the lines below into separate file
            var pOfTarget = data.percentageOfTarget;
            var percentage = data.percentageOfTarget.split('%');
            percentage = parseInt(percentage[0]);
            if (percentage > 100) {
                pOfTarget = '100%';
            }
            var publicService = `<div id="${key}">
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
                    <div style="width: ${pOfTarget};">
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
                    <div><button type="button" title="${data.id}" id="${key}" class="donate-sc">DONATE</button></div>
                </div>
            </div>`;
            $('.localServices').prepend(publicService);
        }
    }); */
}
