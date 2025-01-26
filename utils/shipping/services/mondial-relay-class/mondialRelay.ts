const convert = require('convert-units');
const mondialRelaySOAP = require('./mondial-relay-api/index');
import { Tarifs } from "./Tarifs"; 
import { mrDetails, basicDetails } from "./@types/types";

function calculateMaxWeight(weight: number) {
    const acceptableValues = [250, 500, 1000, 2000, 3000, 5000, 7000, 10000];

    if (weight >= 0 && weight <= acceptableValues[0]) {
        return acceptableValues[0];
    } else {
        for (let i = 1; i < acceptableValues.length; i++) {
            if (weight > acceptableValues[i - 1] && weight <= acceptableValues[i]) {
                return acceptableValues[i];
            }
        }
        // If weight exceeds the maximum acceptable value, return false or handle accordingly
        return false;
    }
}

class MondialRelay {

	public id_order: number;
	public static Enseigne: string = process.env.MR_ENSEIGNE || 'BDTEST13';;
	private expe_first_name: string;
	private expe_last_name: string;
	private base_country: string;
	private base_ville: string;
	private base_zipcode: string;
	private business_name: string;
	private available_countries: any;
	private ModeCol: string;
	private Expe_Langage: string;
	private Expe_Ad1: string;
	private Expe_Ad2: string;
	private Expe_Ad3: string;
	private Expe_Ad4: string;
	private Expe_Ville: string;
	private Expe_CP: string;
	private Expe_Pays: string;
	private Expe_Tel1: string;
	public Dest_Langage: string;
	public Dest_Ad1: string;
	public Dest_Ad2: string;
	public Dest_Ad3: string;
	public Dest_Ad4: string;
	public Dest_Ville: string;
	public Dest_CP: string;
	public Dest_Pays: string;
	public Dest_Tel1: string;
	
	public ModeLiv: string;
	public poids: number;

	private COL_Rel_Pays: string;
	private COL_Rel: string;
	public LIV_Rel_Pays: string;
	public LIV_Rel: string;

	public relay_number?: string;

    constructor(details: mrDetails ) {
		this.id_order = details.id_order;

		this.expe_first_name = 'John';
		this.expe_last_name = 'Doe';
		this.base_country = 'FR';
		this.base_ville = 'PARIS';
        this.base_zipcode = '75010';
		this.business_name = 'LE MIEL SHOP';

		this.available_countries = {
			'FR':{
				'HOM': false,
				'24R': true
			},
			'LU':{
				'HOM': true,
				'24R': true
			},
			'BE':{
				'HOM': true,
				'24R': true
			},
			'NL':{
				'HOM': true,
				'24R': true
			},
			'PT':{
				'HOM': true,
				'24R': true
			},
			'ES':{
				'HOM': true,
				'24R': true
			},
			'DE':{
				'HOM': true,
				'24R': false
			},
			'IT':{
				'HOM': true,
				'24R': false  
			},
			'AT':{
				'HOM': true,
				'24R': false
			}
		}

		this.ModeCol = 'REL';
		
		this.Expe_Langage = 'FR';
		this.Expe_Ad1 = `MR ${this.expe_last_name} ${this.expe_first_name}`;
		this.Expe_Ad2 = '';
		this.Expe_Ad3 = '7 Rue du Chalet';
		this.Expe_Ad4 = '';
		this.Expe_Ville = this.base_ville;
		this.Expe_CP = this.base_zipcode;
		this.Expe_Pays = this.base_country;
		this.Expe_Tel1 = '+33187653015'; // TODO: This has to change to a real tel number !!!
		// this.Expe_Mail = 'Email@gl...' // TODO: Optional
		
		this.Dest_Langage = (details.countryCode == 'FR' ? 'FR' : 'EN'); // TODO: This has to be verified
		this.Dest_Ad1 = `${(details.gender == 'M') ? 'M.' : 'MLE'} ${details.lastName} ${details.firstName}`; // TODO: This needs to be verified
		this.Dest_Ad2 = '';
		this.Dest_Ad3 = details.streetAddress;
		this.Dest_Ad4 = (details.streetAddress2 ? details.streetAddress2 : '');
		this.Dest_Ville = details.city;
		this.Dest_CP = details.postalCode;
		this.Dest_Pays = details.countryCode;
		this.Dest_Tel1 = details.numberPhone// TODO: this has to be verified
		// this.Expe_Mail = user_data.email // TODO: Optional
		
		if (!this.available_countries[this.Dest_Pays])
			throw Error('Incorrect Country Code');

		if (!this.available_countries[this.Dest_Pays][details.modeLiv])
			throw Error('Incorrect Delivery Method');

		this.ModeLiv = details.modeLiv;

		this.COL_Rel_Pays = (details.colCountryCode) ? details.colCountryCode : '';
		this.COL_Rel = (details.colRelayNumber) ? details.colRelayNumber : '';
		this.LIV_Rel_Pays = (details.livCountryCode) ? details.livCountryCode : '';
		this.LIV_Rel = (details.relayNumber) ? details.relayNumber : '';
		

		this.poids = details.package_weight;    

		// TODO: Add a Fixated Relay point:
		// this.base_relay_num = 'XXXXX';
    }

    convertWeight(weight: number, fromUnit: number, toUnit: number) {
		console.log(weight, fromUnit, toUnit)
        return convert(weight).from(fromUnit).to(toUnit);
    }

	public static getQuote(details: basicDetails) {
		// const MaxWeight = calculateMaxWeight(this.convertWeight(this.poids, 'kg', 'g'));
		const MaxWeight = calculateMaxWeight(details.package_weight);
		console.log(details.modeLiv, details.countryCode, MaxWeight);
		const total = Tarifs[details.modeLiv][details.countryCode][`${MaxWeight}`]['TTC'];
		console.log("2.", details.modeLiv);
		return {
			total: total
		};
	}

	// TODO: What if Admin wants to change the shipping method
	public setDeliveryMethod(method: 'HOM' | '24R', relay_number = null) {
		if (!this.available_countries[this.Dest_Pays][method])
			throw Error('Incorrect Delivery Method');

        this.ModeLiv = method;
        this.relay_number = (relay_number) ? `${relay_number}` : '';
    }

	public static async searchPointRelay(Pays: string, Ville: string, CP: string, type: "REL" | "24R" = "24R") {
        return await mondialRelaySOAP.searchPointsRelais({
            'Enseigne': MondialRelay.Enseigne,
            'Pays': Pays,
            'Ville': Ville,
            'CP': CP,
            'Action': type
        });
    }

	public static async trackShipment(expNum: string, langue: string) {
		return await mondialRelaySOAP.getTracking({
			'Enseigne': MondialRelay.Enseigne,
			'Expedition': expNum,
			'Langue': langue
		});
	}

	public async initiateExpedition() {
		console.log("8.", this.ModeLiv);
		let Parameters = {
			Enseigne: MondialRelay.Enseigne,
			ModeCol: this.ModeCol,
			ModeLiv: this.ModeLiv,
			NDossier: "",
			NClient: "",
			Expe_Langage: this.Expe_Langage,
			Expe_Ad1: this.Expe_Ad1,
			Expe_Ad2: this.Expe_Ad2,
			Expe_Ad3: this.Expe_Ad3,
			Expe_Ad4: this.Expe_Ad4,
			Expe_Ville: this.Expe_Ville,
			Expe_CP: this.Expe_CP,
			Expe_Pays: this.Expe_Pays,
			Expe_Tel1: this.Expe_Tel1,
			Expe_Tel2: "",
			Expe_Mail: "",
			Dest_Langage: this.Dest_Langage,
			Dest_Ad1: this.Dest_Ad1,
			Dest_Ad2: this.Dest_Ad2,
			Dest_Ad3: this.Dest_Ad3,
			Dest_Ad4: this.Dest_Ad4,
			Dest_Ville: this.Dest_Ville,
			Dest_CP: this.Dest_CP,
			Dest_Pays: this.Dest_Pays,
			Dest_Tel1: this.Dest_Tel1,
			Dest_Tel2: "",
			Dest_Mail: "",
			Poids: `${this.poids}`,
			Longeur: "",
			Taille: "",
			NbColis: "1",
			CRT_Valeur: "0",
			CRT_Devise: "",
			Exp_Valeur: "",
			Exp_Devise: "",
			COL_Rel_Pays: this.COL_Rel_Pays,
			COL_Rel: this.COL_Rel,
			LIV_Rel_Pays: this.LIV_Rel_Pays,
			LIV_Rel: this.LIV_Rel,
			TAvisage: "",
			TReprise: "",
			Montage: "",
			TRDV: "",
			Assurance: "",
			Instructions: "",
			Texte: ""
		  }
		
		// console.log(Parameters);
		try {
			console.log("9.", this.ModeLiv);
			console.log(Parameters);

			let ResLabel = await mondialRelaySOAP.createLabel(Parameters);

			const resultEtiquettes = await mondialRelaySOAP.getLabels({
				Enseigne: MondialRelay.Enseigne,
				Expeditions: ResLabel.ExpeditionNum,
				Langue: 'FR'
			});

			return {
				NDossier: "",
				NClient: "",
				Expe_Langage: this.Expe_Langage,
				Expe_Ad1: this.Expe_Ad1,
				Expe_Ad2: this.Expe_Ad2,
				Expe_Ad3: this.Expe_Ad3,
				Expe_Ad4: this.Expe_Ad4,
				Expe_Ville: this.Expe_Ville,
				Expe_CP: this.Expe_CP,
				Expe_Pays: this.Expe_Pays,
				Expe_Tel1: this.Expe_Tel1,
				Expe_Mail: "",
				Dest_Langage: this.Dest_Langage,
				Dest_Ad1: this.Dest_Ad1,
				Dest_Ad2: this.Dest_Ad2,
				Dest_Ad3: this.Dest_Ad3,
				Dest_Ad4: this.Dest_Ad4,
				Dest_Ville: this.Dest_Ville,
				Dest_CP: this.Dest_CP,
				Dest_Pays: this.Dest_Pays,
				Dest_Tel1: this.Dest_Tel1,
				Dest_Mail: "",
				Poids: `${this.poids}`,
				Longeur: "",
				Taille: "",
				CRT_Valeur: "0",
				CRT_Devise: "",
				// Exp_Valeur: "",
				// Exp_Devise: "",
				COL_Rel_Pays: this.COL_Rel_Pays,
				COL_Rel: this.COL_Rel,
				LIV_Rel_Pays: this.LIV_Rel_Pays,
				LIV_Rel: this.LIV_Rel,
				TAvisage: "",

				Montage: "",
				TRDV: "",
				Assurance: "",
				Instructions: "",
				Texte: "",

				modeLiv: `mode${Parameters.ModeLiv}`,
				modeCol: Parameters.ModeCol,
	
				URL_Etq_A4: ResLabel.URL_Etiquette,
				URL_Etq_A5:  resultEtiquettes.URL_PDF_A5,
				URL_Etq_10x15: resultEtiquettes.URL_PDF_10x15,
				ExpeditionNum:  ResLabel.ExpeditionNum,
				id_order: this.id_order
			}
		} catch (err) {
			throw Error(`Error: ${err}`);
		}
		
	}
	

}
module.exports = MondialRelay;


/** TODO: [Code to implement Later]:
 * 
 * Subject: Volume Calculation
 * Status: Not Complete
 * 
 *         let weight = this.poids;
		console.log('weight is: ', weight);
		// Calculate the total cart dimensions by adding the volume of each product then calculating the cubed root
		let volume = 0;

		// TODO: Give actual measurments of Carton
		let meta = {
			"width": 10,
			"height": 12,
			"length": 50,
			"width_unit": "cm",
			"height_unit": "cm",
			"length_unit": "cm"
		}

		if (meta) {
			let productVolume = 1;
		
			// Loop through each dimension (width, height, length)
			['width', 'height', 'length'].forEach(dimension => {
				// Cubic square of the dimension to get the volume of the box
				switch (meta[`${dimension}_unit`]) {
					// Convert units to mm if needed
					case 'cm':
						// Convert from cm to mm
						productVolume *= parseFloat(meta[dimension]) * 10;
						break;
					case 'meter':
						// Convert from m to mm
						productVolume *= parseFloat(meta[dimension]) * 1000;
						break;
					case 'in':
						// Convert from in to mm
						productVolume *= parseFloat(meta[dimension]) * 25.4;
						break;
					default:
						// No conversion needed for other units
						productVolume *= parseFloat(meta[dimension]);
						break;
				}
			});
		
			// Add the calculated product volume to the total volume
			volume += parseFloat(productVolume);
		}

		let cuberoot = Math.ceil(Math.pow(volume, 1 / 3));
		
		// Use default dimensions of 100mm if the volume is zero
		let height = 100; // Mettre dans les options, todo
		let width=100;
		let length=100;

		if (cuberoot > 0) {
		    height = width = length = cuberoot;
		}

		if (length < 100)
		{
			length = 100;
		}
		if (width < 100)
		{
			width = 100;
		}

		// TODO : calculer la longueur déroulée.

		let Taille= '';
		let Poids= '';
 */