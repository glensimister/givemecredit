/***** TO DO *******
- prefix all SAFE API calls with safe_
- move page-specific css styles into their respective folders
- create breadcrumbs
- implement voting registration form
- organisze settings page into tabs (settings doesn't really need to be popup)
*******************/

$(document).ready(async function () {

    if (!safeExperimentsEnabled) {
        alert("You need to toggle experiments (top right) and/or select a webId (top left)");
    }

    /* popup window for settings. This could be put in home folder */

    $('.fa-gears').on('click', function () {
        $('.settings').load('pages/settings.html', function () {
            $('.settings').dialog({
                title: "General Settings",
                width: "auto",
                draggable: false,
                height: 400
            });
        });
    });

    /**** initialize SAFE app and data sets ****/

    let reset = true; /* this is for testing purposes */
    await authoriseAndConnect();

    try {
        await createUsers(reset);
        await createSafeCoin(reset);
        await safe_createPosts(reset);
        await createOfficials(reset);
        await safe_createComments();
    } catch (err) {
        console.log(err + " Error creating datasets. Trying again...");
        reset = false;
        await createUsers(reset);
        await createSafeCoin(reset);
        await safe_createPosts(reset);
        await createOfficials(reset);
        await safe_createComments();
    }

    /* intro page */

    $('.enter, .reset').on('click', async function (e) {
        e.stopImmediatePropagation();

        /*** these variables need to be accessed by the whole app ****/
        const webId = await window.currentWebId["@id"];
        const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
        const webIdName = await window.currentWebId["#me"]["name"];

        /*** reset DB (for testing purposes) ***/
        if ($(this).hasClass('reset')) {
            try {
                await deleteAllUsers();
                await deleteAllOfficials();
                await deleteAllAccounts();
            } catch (err) {
                console.log(err + " Deleting datasets failed");
            }
        } else {
            let verified = await isUserVerified(webId); // check if user exists
            if (!verified) {
                $('#introContainer').fadeOut(2000);
                $('.stars').addClass('animated zoomIn');
                $('.twinkling').addClass('animated zoomIn');
                $('#intro').addClass('animated zoomOut');
                $('#register').show(); //if user is not verified show them the registration form
            } else {
                $('#introContainer').fadeOut(2000);
                $('.stars').addClass('animated zoomIn');
                $('.twinkling').addClass('animated zoomIn');
                $('#intro').addClass('animated zoomOut');
                $('#container').show();
            }
        }
    });

    /*** the unverified user will be presented with a form. When they click submit a new user is created and account credited ***/

    $(document.body).on('click', '.verifyPostCode', async function (e) {
        e.stopImmediatePropagation();
        const webId = await window.currentWebId["@id"];
        const webIdImg = await window.currentWebId["#me"]["image"]["@id"];
        const webIdName = await window.currentWebId["#me"]["name"];
        let pubKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let guid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        try {
            await createNewUser(webId, webIdImg, webIdName, pubKey);
        } catch (err) {
            console.log(err);
        }

        //let balance = 100;
        try {
            await addFunds(guid, {
                pubKey: pubKey,
                balance: 100
            });
            let bal = await getBalance(pubKey);
            $('.rebate div').html(bal);
        } catch (err) {
            console.log(err + " There was a problem adding funds");
        }
        $('#register').hide();
        $('#container').show();
    });
});
