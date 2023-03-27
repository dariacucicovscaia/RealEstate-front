import Estate from "./IEstate";

export default interface Appointment {
    id: bigint;
    madeAt: string;
    start: string;
    end: string;
    appointmentStatus: boolean;
    estate: Estate

}