enum PaymentTransactionType {
    SALE , RENT, LEASE
}

enum AcquisitionStatus {
    OPEN, ON_HOLD
}

enum TypeOfEstate {
    MAGAZINE,
    RESTAURANT,
    CAFE,
    HOTEL,
    SALON,
    OFFICE,
    STUDIO,
    PENTHOUSE,
    LOFT,
    CONDO,
    RAILROAD,
    WING,
    GARDEN,
    BARN,
    BUNGALOW,
    CABIN,
    SINGLE_FAMILY,
    TOWNHOUSE,
    MULTI_FAMILY,
    MODULAR_HOME,
    RANCH_HOME
}

export default interface IEstateSearchFilter {
    paymentTransactionType? :PaymentTransactionType;
    acquisitionStatus?:AcquisitionStatus;

    squareMetersFrom :number;
    squareMetersTo :number;

    numberOfRoomsFrom :number;
    numberOfRoomsTo :number;

    numberOfBathroomsFrom :number;
    numberOfBathroomsTo :number;

    numberOfGaragesFrom :number;
    numberOfGaragesTo :number;

    yearOfConstructionFrom: string;
    yearOfConstructionTo: string;

    typeOfEstates: string[];

    city:string;
    country:string;

    priceFrom :number;
    priceTo :number;

    latestAdded:boolean;
}