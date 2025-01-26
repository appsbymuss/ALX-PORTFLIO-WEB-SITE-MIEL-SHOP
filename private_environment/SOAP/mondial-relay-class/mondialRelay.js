require('dotenv').config();
const convert = require('convert-units');
const mondialRelaySOAP = require('./mondial-relay-api/index');
const Tarifs = require('./Tarifs');

function calculateMaxWeight(weight) {
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

    constructor({
		user_data,
		// [x] TODO: Add Gender to user schema
		address,
		package_weight
	}) {
		this.Enseigne = process.env.MR_ENSEIGNE || 'BDTEST13';
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
		
		this.Dest_Langage = (address.countryCode == 'FR' ? 'FR' : 'EN'); // TODO: This has to be verified
		this.Dest_Ad1 = `${(user_data.gender == 'M') ? 'M.' : 'MLE'} ${user_data.lastName} ${user_data.firstName}`; // TODO: This needs to be verified
		this.Dest_Ad2 = '';
		this.Dest_Ad3 = address.streetAddress;
		this.Dest_Ad4 = (address.streetAddress2 ? address.streetAddress2 : '');
		this.Dest_Ville = address.city;
		this.Dest_CP = address.postalCode;
		this.Dest_Pays = address.countryCode;
		this.Dest_Tel1 = user_data.numberPhone// TODO: this has to be verified
		// this.Expe_Mail = user_data.email // TODO: Optional
		
		// TODO: ADD ENUM TO ENFORCE THE RIGHT COUNTRY CODE !!!!!!!!!
		if (!this.available_countries[this.Dest_Pays])
			throw Error('Incorrect Country Code');

		this.ModeLiv = 
			this.available_countries[this.Dest_Pays]['24R'] == true 
			? '24R'
			: 'HOM'; // HOM or 24R

		this.COL_Rel_Pays;
		this.COL_Rel;
		this.LIV_Rel_Pays = '';
		this.LIV_Rel = '';
		

		this.poids = package_weight;
		
        

		// TODO: Add a Fixated Relay point:
		// this.base_relay_num = 'XXXXX';
		
		
		

        // change to true to log (to the PHP error log) the API URLs and responses for each active service
		// TODO: Still no use for this
        this.debug = true;

        return true;
    }

    convertWeight(weight, fromUnit, toUnit) {
		console.log(weight, fromUnit, toUnit)
        return convert(weight).from(fromUnit).to(toUnit);
    }

	calculateTarif() {
		if (!this.ModeLiv || !this.poids)
			return;
		const MaxWeight = calculateMaxWeight(this.convertWeight(this.poids, 'kg', 'g')); // in grams
		const total = Tarifs[this.ModeLiv][this.Dest_Pays][`${MaxWeight}`]['TTC'];
		return {
			total: total,
			information: {
				ModeLiv: this.ModeLiv,
				Dest_Pays: this.Dest_Pays,
				MaxWeight: MaxWeight
			}
		};
	}

    // a "quote" typically refers to an estimated cost or price provided to a customer for shipping services.
    async getQuote() {

        let weight = this.convertWeight(this.poids, 'kg', 'g');
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
	
	
		let franceAvailableRelays;
		let recepAvailableRelays;

		let Expediteur_Par = {
			'Enseigne': this.Enseigne,
			'Pays': this.base_country,
			'Ville': this.base_ville,
			'CP': this.base_zipcode,
			'Taille': Taille,
			'Poids': weight,
			'Action': 'REL'
		}
		
		if (this.ModeLiv == '24R'){
			let Recepteur_Par = {
				'Enseigne': this.Enseigne,
				'Pays': this.Dest_Pays,
				'Ville': this.Dest_Ville,
				'CP': this.Dest_CP,
				'Taille': Taille,
				'Poids': weight,
				'Action': '24R'
			};
 
			recepAvailableRelays = await mondialRelaySOAP.searchPointsRelais(Recepteur_Par);
			console.log('available:' , recepAvailableRelays);
		}


		// TODO: Add code to choose 'LOCKER' or 'In premises'
		franceAvailableRelays = await mondialRelaySOAP.searchPointsRelais(Expediteur_Par);

		if (!recepAvailableRelays || (recepAvailableRelays && recepAvailableRelays.length == 0))
			this.ModeLiv = 'HOM';
		else
			this.ModeLiv = '24R';

		this.COL_Rel_Pays = this.base_country;
		this.COL_Rel = franceAvailableRelays[0]['Num'];

		if (this.ModeLiv == '24R')
		{
			this.LIV_Rel_Pays = this.Dest_Pays;
			this.LIV_Rel = recepAvailableRelays[0]['Num'];
		}

		return {
			'closest_relay_expe': franceAvailableRelays[0],
			'closest_relay_dest': (this.ModeLiv == '24R' ? recepAvailableRelays[0] : null)
		}
    }

	async initiateExpedition() {

		const Parameters = {
			Enseigne: this.Enseigne,
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
			Poids: `${this.convertWeight(this.poids, 'kg', 'g')}`,
			Longueur: "",
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
		
		console.log(Parameters);

		let result = mondialRelaySOAP.createLabel(Parameters)
		.catch((err) => {
			console.log(err);
			throw new Error('Problem With creating Label', Parameters);
		}).then((res) => {
			result = res;
			console.log(result);
			const resultEtiquettes = mondialRelaySOAP.getLabels({
				Enseigne: this.Enseigne,
				Expeditions: result.ExpeditionNum,
				Langue: 'FR'
			})
			.catch((err) => {
				console.log(err);
			})
			.then((dat) => {
				console.log(dat);
			})
		});
		
	}
	

}
module.exports = MondialRelay;


// {
// 			Enseigne: process.env.ENSEIGNE,
// 			ModeCol: "REL",
// 			ModeLiv: "HOM",
// 			NDossier: "",
// 			NClient: "",
// 			Expe_Langage: "FR",
// 			Expe_Ad1: "MR El Idrissi Youssef",
// 			Expe_Ad2: "",
// 			Expe_Ad3: "10 Rue de la Paix",
// 			Expe_Ad4: "",
// 			Expe_Ville: "PARIS",
// 			Expe_CP: "75001",
// 			Expe_Pays: "FR",
// 			Expe_Tel1: "+33187653015",
// 			Expe_Tel2: "",
// 			Expe_Mail: "",
// 			Dest_Langage: "EN",
// 			Dest_Ad1: "MR Ismael El Amraoui",
// 			Dest_Ad2: "",
// 			Dest_Ad3: "552 Rue de la s",
// 			Dest_Ad4: "",
// 			Dest_Ville: "Tetouan",
// 			Dest_CP: "75001",
// 			Dest_Pays: "DE",
// 			Dest_Tel1: "+33187653015",
// 			Dest_Tel2: "",
// 			Dest_Mail: "",
// 			Poids: "500",
// 			Longueur: "",
// 			Taille: "",
// 			NbColis: "1",
// 			CRT_Valeur: "0",
// 			CRT_Devise: "",
// 			Exp_Valeur: "",
// 			Exp_Devise: "",
// 			COL_Rel_Pays: "FR",
// 			COL_Rel: "014692",
// 			LIV_Rel_Pays: "",
// 			LIV_Rel: "",
// 			TAvisage: "",
// 			TReprise: "",
// 			Montage: "",
// 			TRDV: "",
// 			Assurance: "",
// 			Instructions: "",
// 			Texte: ""
// 		  }
