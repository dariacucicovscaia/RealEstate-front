import Estate from "./IEstate";

export default interface EstatePrice {
    id: bigint;
    price: bigint;
    lastUpdatedAt: string;
    currency: string;
    estate: Estate;
}
