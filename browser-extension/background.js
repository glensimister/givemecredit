//localStorage.clear();
//chrome.storage.local.clear();

chrome.runtime.onMessage.addListener(function (request, sendResponse) {

    if (request.type == 'openIndex') {
        chrome.tabs.create({
            'url': 'https://github.com/GiveMeCredit/extension',
            active: true
        });
    }

    /* if (request.type == 'balance') {
         var silverCredBalance = {
             'balance': request.balance
         }
         chrome.storage.local.set({
             'silverCredBalance': silverCredBalance
         });
     }*/

    /* This request is sent by js/wallet/wallet.js. 
    When the user clicks on the login button (2nd tab on the top right popup), the user details are stored to chrome local storage. These details should be stored temporarily (to do). They will be accessed mainly be the profile js files. */

    if (request.type == 'user') {
        var user = {
            "usrPubKey": request.pubKey,
            "usrPrvKey": request.prvKey,
            "usrDate": request.date
        };

        chrome.storage.local.set({
            'user': user
        });
    }
    /* This request is sent by main.js.
    If someone is lobbying for credit, their account number/address will be passed to this request and placed in local storage. It is then requested by js/wallet/wallet.js. wallet.js uses the data to pre-populate the wallet input box (although you can replace this and send money to anyone you choose) */

    if (request.type === 'recipient') {
        var recipient = {
            recipientID: request.recipientID
        }
        chrome.storage.local.set({
            'recipientID': recipient
        });
    }

    /* This request is sent by main.js when you click on the profile icon that shows your public profile. */

    if (request.type === 'showProfile') {
        chrome.tabs.create({
                url: chrome.extension.getURL('/html/profile.html?id=' + request.userID),
                active: false
            },
            function (tab) {
                var w = 851;
                var h = 500;
                chrome.windows.create({
                    tabId: tab.id,
                    type: 'popup',
                    focused: true,
                    width: w,
                    height: h
                });
            });
    }
});