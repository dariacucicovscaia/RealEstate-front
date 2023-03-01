import http from "../http-common";
import LoginDTO from "../types/LoginDTO";

class LoginService {
    async login(loginDTO : LoginDTO) {
        return await http.post<string>(`/auth/login`, loginDTO);
    }
}

export default new LoginService();