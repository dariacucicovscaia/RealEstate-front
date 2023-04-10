import http from "../config/http-common";
import IDynamicConfig from "../types/IDynamicConfig";

class DynamicApplicationConfigurationService {
    async updateProperties(
        oldConfigurationType: string,
        newConfigurationType: string,
        configurationName: string,
        authHeader: string) {
        return await http.put(`/api/v1/config/update/${oldConfigurationType}/${newConfigurationType}/${configurationName}`, {}, {
            headers: {
                "Authorization": authHeader
            }
        })
    }
    async getConfig( configurationName: string,
                     configurationStatus: boolean,
                     authHeader: string){
        return await  http.get<IDynamicConfig>(`/api/v1/config/${configurationName}/${configurationStatus}`,{
            headers: {
                "Authorization": authHeader
            }
        })
    }
}

export default new DynamicApplicationConfigurationService();