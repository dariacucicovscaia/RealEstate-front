import {Dayjs} from "dayjs";
import http from "../config/http-common";

class ReportService {
    async generateReport(start: Dayjs , end: Dayjs, estateId: number, authHeader: string) {
        return await http.post<string>(`/api/v1/report/generate/${start.format("YYYY-MM-DDTHH:mm:ss")}/${end.format("YYYY-MM-DDTHH:mm:ss")}/${estateId}`, {}, {
            headers: {
                "Authorization": authHeader
            }
        });
    }
}

export default new ReportService();