import {Address} from "./Address";
import User from "./User";

export default interface IEstate {
    id: number;
    paymentTransactionType: string;
    acquisitionStatus: string;
    createdAt: string;
    lastUpdatedAt: string;
    estatePhotos: string[];
    address: Address;
    owner: User;

}