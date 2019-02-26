$('#content1').load('pages/settings/html/general.html', async function () {
    let pubKey = await safe_getUserPubKeyFromWebId(webId);
    $('.safeCoinPubKey').val(pubKey);
});
$('#content2').load('pages/settings/html/extensions.html');
$('#content3').load('pages/settings/html/addnew.html');
$('#content4').load('pages/settings/html/personaldata.html');
