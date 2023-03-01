import http from "../http-common";
import EstateDTO from "../types/EstateDTO";
import IEstate from "../types/IEstate";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import {useAuthHeader} from "react-auth-kit";


class Estate {


    getAllEstateDetails(estateId: number) {
        return http.get<EstateDTO>(`/estate/allDetails/${estateId}`);
    }

    createEstateWithAllDetails(estateDTO: EstateDTO) {
        return http.post<EstateDTO>(`/estate`, estateDTO);
    }

    getAllEstatesByAllCriteria(estateSearchFilter: IEstateSearchFilter, pageSize: number, pageNumber: number, authHeader :string ) {
        return http.post<IEstate>(`/estate/estatesByAllCriteria`, estateSearchFilter, {

            params: {
                page: pageNumber,
                size: pageSize
            },
            headers:{
                "Authorization " :  authHeader
            }
        });
    }
}

export default new Estate();