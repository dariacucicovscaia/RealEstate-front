import Appointment from "../types/Appointment";
import http from "../http-common";
import Page from "../types/Page";


class AppointmentService {
    async createAppointment(appointment: Appointment, userId: bigint) {
        return await http.post<Appointment>(`/appointment/create/${userId}`, appointment);
    }

    async getByAppointmentById(appointmentId: number) {
        return await http.get<Appointment>(`/appointment/details/${appointmentId}`);
    }

    async updateAppointmentById(appointmentId: bigint | undefined, appointment: Appointment) {
        return await http.put<Appointment>(`/appointment/update/${appointmentId}`, appointment);
    }

    async updateAppointmentByIntoConfirmed(appointmentId: bigint | undefined) {
        return await http.put<Appointment>(`/appointment/update/confirm-status/${appointmentId}`);
    }

    async getAppointmentsByUserId(userId: number, pageSize: number, pageNumber: number, authHeader :string) {
        return await http.get<Page<Appointment>>(`/appointment/myAppointments/${userId}`, {
            params: {
                page: pageNumber,
                size: pageSize
            },
            headers:{
                "Authorization" :  authHeader
            }
        })
    }

}

export default new AppointmentService();