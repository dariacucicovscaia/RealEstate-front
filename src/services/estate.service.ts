import http from "../config/http-common";
import EstateDTO from "../types/EstateDTO";
import IEstate from "../types/IEstate";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import Page from "../types/Page";


class EstateService {

    getAllEstateDetails(estateId: number) {
        return http.get<EstateDTO>(`/api/v1/estate/allDetails/${estateId}`);
    }

    getOwnersEstates(ownerId: number, page: number, size: number, authHeader: string) {
        return http.get<Page<IEstate>>(`/api/v1/estate/ownersEstates/${ownerId}`, {
            params: {
                page: page,
                size: size
            },
            headers: {
                "Authorization": authHeader
            }
        });
    }

    createEstateWithAllDetails(estateDTO: EstateDTO, authHeader: string) {
        return http.post<EstateDTO>(`/api/v1/estate`, estateDTO, {
            headers: {
                "Authorization": authHeader
            }
        });
    }

    getAllEstatesByAllCriteria(estateSearchFilter: IEstateSearchFilter, pageSize: number, pageNumber: number) {
        return http.post<Page<IEstate>>(`/api/v1/estate/estatesByAllCriteria`, estateSearchFilter, {
            params: {
                page: pageNumber,
                size: pageSize
            }
        });
    }
}

export default new EstateService();