import Appointment from "../types/Appointment";
import http from "../http-common";
import Page from "../types/Page";


class AppointmentService {
    createAppointment(appointment: Appointment, userId: bigint) {
        return http.post<Appointment>(`/appointment/create/${userId}`, appointment);
    }

    getByAppointmentById(appointmentId: number) {
        return http.get<Appointment>(`/appointment/details/${appointmentId}`);
    }

    updateAppointmentById(appointmentId: bigint | undefined, appointment: Appointment) {
        return http.put<Appointment>(`/appointment/update/${appointmentId}`, appointment);
    }

    updateAppointmentByIntoConfirmed(appointmentId: bigint | undefined) {
        return http.put<Appointment>(`/appointment/update/confirm-status/${appointmentId}`);
    }

    getAppointmentsByUserId(userId: number, pageSize: number, pageNumber: number) {
        return http.get<Page<Appointment>>(`/appointment/myAppointments/${userId}`, {params: {page: pageNumber, size: pageSize}})
    }

}

export default new AppointmentService();