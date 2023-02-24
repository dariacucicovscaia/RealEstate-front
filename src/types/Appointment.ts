import Estate from "./IEstate";

export default interface Appointment {
    id: bigint;
    madeAt: string;
    start: string;
    end: string;
    appointmentStatus: string;
    estate: Estate

}