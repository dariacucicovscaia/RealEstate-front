import {Address} from "./Address";
import User from "./User";

export default interface IEstate {
    id: bigint;
    paymentTransactionType: string;
    acquisitionStatus: string;
    createdAt: string;
    lastUpdatedAt: string;
    address: Address;
    owner: User;

}