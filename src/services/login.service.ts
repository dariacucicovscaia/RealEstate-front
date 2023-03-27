import http from "../http-common";
import LoginDTO from "../types/LoginDTO";
import IToken from "../types/IToken";

class LoginService {
    async login(loginDTO : LoginDTO) {
        return await http.post<IToken>(`/api/v1/auth/login`, loginDTO)
    }
}

export default new LoginService();