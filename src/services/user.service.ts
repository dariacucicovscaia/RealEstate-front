import http from "../http-common";
import User from "../types/User";


class UserService {
    async getByEmail(email: string | undefined) {
        return await http.get<User>(`/user/email/${email}`);
    }

    createUser(user : User){
        return http.post<User>(`user/register`, user)
    }
}

export default new UserService();