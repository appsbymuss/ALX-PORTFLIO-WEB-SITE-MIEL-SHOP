'use strict';

const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

async function generateInvoice_pdf(factureID) {
	console.time("all");
	const ext = '.pdf'
	const inputPath = path.join(__dirname, `/../generated/excelInvoices/${factureID}.xlsx`);
	const outputPath = path.join(__dirname, `/../generated/pdfInvoices/${factureID}${ext}`);
	console.time("read_file");
	const xlsxBuf = await fs.readFile(inputPath);
	console.timeEnd("read_file");
	// Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
	console.time("convert_buffer");
	let pdfBuf = await libre.convertAsync(xlsxBuf, ext, undefined);
	console.timeEnd("convert_buffer");
	// Here in done you have pdf file which you can save or transfer in another stream
	console.time("write_file");
	await fs.writeFile(outputPath, pdfBuf);
	console.timeEnd("write_file");
	console.timeEnd("all");

	return outputPath
}	

module.exports = generateInvoice_pdf;