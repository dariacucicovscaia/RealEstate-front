import jwt_decode from "jwt-decode"
import {IUserDetailsJWT} from "../types/IUserDetailsJWT";

class JWTParser {
    decodeToken(jwtToDecode: string) {
        return <IUserDetailsJWT>jwt_decode(jwtToDecode)
    }

    checkIfTokenIsValid(jwtToDecode: string){
        const token = this.decodeToken(jwtToDecode);
        return 1000 * token.exp > new Date().getTime() + 1000;
    }
}

export default new JWTParser();