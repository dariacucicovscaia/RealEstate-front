import http from "../http-common";
import User from "../types/User";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import Page from "../types/Page";


class UserService {
    async getByEmail(email: string | undefined) {
        return await http.get<User>(`/user/email/${email}`);
    }

    async getAllUsers(criteria: string | undefined, pageSize: number, page: number, authHeader: string) {
            return await http.get<Page<AdminPanelFullUser>>(`/user/allUsers`,
                {
                    params: {
                        page: page,
                        size: pageSize,
                        criteria : criteria
                    },
                    headers: {
                        "Authorization": authHeader
                    }
                });
    }

    createUser(user: User) {
        return http.post<User>(`user/register`, user)
    }


}

export default new UserService();