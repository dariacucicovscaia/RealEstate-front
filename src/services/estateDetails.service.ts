import http from "../http-common";
import EstateDTO from "../types/EstateDTO";
import IEstate from "../types/IEstate";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import Page from "../types/Page";

class EstateDetails {
    getAllEstateDetails(estateId: number) {
        return http.get<EstateDTO>(`/api/v1/estate/allDetails/${estateId}`);
    }

    createEstateWithAllDetails(estateDTO: EstateDTO) {
        return http.post<EstateDTO>(`/api/v1/estate`, estateDTO);
    }

    getAllEstatesByAllCriteria(estateSearchFilter: IEstateSearchFilter, pageSize: number, pageNumber: number) {
        return http.post<Page<IEstate>>(`/api/v1/estate/estatesByAllCriteria`, estateSearchFilter, {
            params: {
                page: pageNumber,
                size: pageSize
            },

        });
    }
}

export default new EstateDetails();