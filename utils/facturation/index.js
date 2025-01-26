const Workbook = require('xlsx-populate')

async function generateInvoice_excel(data) {
    let workbook = await Workbook.fromFileAsync(`${__dirname}/invoice.xlsx`);
    let worksheet = workbook.sheet('Main');

     // Fill business owner info
     worksheet.cell('A6').value('Miel Shop');
     worksheet.cell('A7').value('Street Address PLACEHOLDER');
     worksheet.cell('A8').value('Zip Code PLACEHOLDER');
     worksheet.cell('A9').value('phone PLACEHOLDER');
     worksheet.cell('A11').value('webiste: PLACEHOLDER');
 
     // Fill client info
     worksheet.cell('A14').value(`${data.client.lastName} ${data.client.firstName}`);
     worksheet.cell('A15').value(data.client.streetAddress);
     worksheet.cell('A16').value(`${data.client.city}, ${(data.client.province) ? data.client.province : ''} ${data.client.postalCode}`);
     worksheet.cell('A17').value(data.client.numberPhone);
 
     // Delivery fees
     worksheet.cell('J40').value(data.shippingInfo.LivraisonTarif);

     // Invoice Info
    //  worksheet.cell('J2').value(date_of_facture);
    worksheet.cell('J4').value(data.orderInfo.factureID);
    worksheet.cell('J5').value(data.client.user_id);
 
     // Fill table for items
     const items = data.items;

     items.forEach((item, index) => {
        const row = 21 + index;
        worksheet.cell(`A${row}`).value(item.product.name);
        // TODO: for coupon values
        worksheet.cell(`C${row}`).value((item.couponPercentage) ? item.couponPercentage : 0);
        worksheet.cell(`D${row}`).value((item.reducedRemise) ? item.reducedRemise : 0);
        worksheet.cell(`E${row}`).value(parseInt(item.TVA_perc));
        worksheet.cell(`F${row}`).value(parseFloat(item.TVA_UNIT));
        worksheet.cell(`G${row}`).value(item.quantity);
        worksheet.cell(`H${row}`).value(parseFloat(item.product.base_price));
        worksheet.cell(`I${row}`).value(parseFloat(item.product.price))
        worksheet.cell(`J${row}`).value(parseFloat(((parseFloat(item.product.price) + item.TVA_UNIT) * item.quantity)))
    });

    worksheet.cell(`J37`).value();
    worksheet.cell(`J38`).value();
    worksheet.cell(`J39`).value();
    worksheet.cell(`J40`).value();
    worksheet.cell(`J42`).value();

    // worksheet.cell('J2').value(date_of_facture);

    await workbook.toFileAsync(`${__dirname}/generated/excelInvoices/${data.orderInfo.factureID}.xlsx`);
}

module.exports = generateInvoice_excel;