const MondialRelay = require("../mondialRelay");

(async () => {
    const md_client = new MondialRelay({
        address: {
            streetAddress: 'Line 1 Address',
            streetAddress2: 'Line 2 Address',
            city: 'Adioso',
            postalCode: '10117', // This Has to be correct
            countryCode: 'DE', // This Has to be correct
            
        },
        user_data: {
            firstName: 'Youssef',
            lastName: 'El Idrissi',
            gender: 'M',
            numberPhone: '+352187655015'
        },
        package_weight: 2.5
    });

    try{
        const result = await md_client.getQuote();
        console.log(result);
        const tarif = md_client.calculateTarif();
        console.log(tarif)
        const res = await md_client.initiateExpedition();
        console.log(res);
    } catch (err) {
        console.error(err);
    }
})();