enum PaymentTransactionType {
    SALE, RENT, LEASE
}

enum AcquisitionStatus {
    OPEN, ON_HOLD, SOLD
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

export default interface EstateDTO {
    paymentTransactionType: PaymentTransactionType;
    acquisitionStatus: AcquisitionStatus;
    createdAt: string;
    lastUpdatedAt: string;

    squareMeters: number;
    numberOfRooms: number;
    numberOfBathRooms: number;
    numberOfGarages: number;
    yearOfConstruction: string;
    typeOfEstate: TypeOfEstate;

    fullAddress: string;
    city: string;
    country: string;

    email: string;

    price: number;
    lastPriceUpdatedAt: string;
    currency: string;
    estatePhotos: string[];
}