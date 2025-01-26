export type mrDetails = {
    firstName: string,
    lastName: string,
    gender: string, // M, F..
    numberPhone: string,
    email?: string,

    countryCode: string, // FR, EN
    streetAddress: string,
    streetAddress2: string,
    city: string,
    postalCode: string,
    
    modeLiv: string,

    // COLLECTION RELAY:
    colRelayNumber: string,
    colCountryCode: string,
    // LIVRAISON RELAY: (Optional)
    relayNumber?: string,    // If Relay is choosen
    livCountryCode?: string, // If Relay is choosen

    package_weight: number,

    id_order: number
};

export type basicDetails = {
    countryCode: string, // FR, EN
    streetAddress: string,
    streetAddress2: string,
    city: string,
    postalCode: string,
    
    modeLiv: string,
    relayNumber?: string,    // If Relay is choosen
    livCountryCode?: string, // If Relay is choosen

    package_weight: number,
}