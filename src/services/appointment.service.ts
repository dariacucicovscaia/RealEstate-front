import Appointment from "../types/Appointment";
import http from "../http-common";
import Page from "../types/Page";
import {Dayjs} from "dayjs";
import AppointmentDTO from "../types/AppointmentDTO";


class AppointmentService {
    async createAppointment(start: (Dayjs | null), userId: number, estateId: number, authHeader: string) {
        return await http.post<AppointmentDTO>(`/api/v1/appointment/create/${start?.format("YYYY-MM-DDTHH:mm:ss")}/${userId}/${estateId}`, {}, {
            headers: {
                "Authorization": authHeader
            }
        });
    }

    async getByAppointmentById(appointmentId: number) {
        return await http.get<Appointment>(`/api/v1/appointment/details/${appointmentId}`);
    }

    async updateAppointmentById(appointmentId: bigint | undefined, appointment: Appointment) {
        return await http.put<Appointment>(`/api/v1/appointment/update/${appointmentId}`, appointment);
    }

    async updateAppointmentByIntoConfirmed(appointmentId: bigint | undefined) {
        return await http.put<Appointment>(`/api/v1/appointment/update/confirm-status/${appointmentId}`);
    }

    async confirmAppointment(appointmentId: number, authHeader: string) {
        return await http.get<string>(`/api/v1/appointment/update/confirm-status/${appointmentId}`,  {
            headers: {
                "Authorization": authHeader
            }
        });
    }

    async getAppointmentsByUserId(userId: number, pageSize: number, pageNumber: number, authHeader: string) {
        return await http.get<Page<Appointment>>(`/api/v1/appointment/myAppointments/${userId}`, {
            params: {
                page: pageNumber,
                size: pageSize
            },
            headers: {
                "Authorization": authHeader
            }
        })
    }

}

export default new AppointmentService();