import http from "../http-common";
import User from "../types/User";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import Page from "../types/Page";
import IProfileUser from "../types/IProfileUser";
import IProfile from "../types/IProfile";

class UserService {
    async getAllUsers(criteria: string | undefined, pageSize: number, page: number, authHeader: string) {
        return await http.get<Page<AdminPanelFullUser>>(`/api/v1/user/allUsers`,
            {
                params: {
                    page: page,
                    size: pageSize,
                    criteria: criteria
                },
                headers: {
                    "Authorization": authHeader
                }
            });
    }

    async createUser(user: User) {
        return await http.post<User>(`/api/v1/user/register`, user)
    }
   async updateUser(userId: number, profile : IProfileUser, authHeader : string) {
        return await http.put<User>(`/api/v1/user/updateProfile/${userId}`, profile, {
            headers: {
                "Authorization": authHeader
            }
        })
    }

    async getOwnerOfAnEstate(estateId: number) {
        return await http.get<User>(`/api/v1/user/getEstateOwner/${estateId}`)
    }

   async changeUserStatus(userId: number, accountStatus: string, authHeader : string) {
        return await http.put<User>(`/api/v1/user/changeAccountStatus/${userId}/${accountStatus}`,{}, {
            headers: {
                "Authorization": authHeader
            }
        })
    }
    async getUserDetails(userId: number, authHeader : string) {
        return await http.get<AdminPanelFullUser>(`/api/v1/user/user/${userId}`,{
            headers: {
                "Authorization": authHeader
            }
        })
    }
    async addProfilePicture (profilePicture:string, userId:number, authHeader:string){
        return await http.put<IProfile>(`api/v1/profile/addProfilePicture/${userId}/${profilePicture}`,{},{
            headers: {
                "Authorization": authHeader
            }
        })
    }

}

export default new UserService();