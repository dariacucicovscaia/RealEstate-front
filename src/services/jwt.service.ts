import jwt_decode from "jwt-decode"
import {IUserDetailsJWT} from "../types/IUserDetailsJWT";

class JWTParser {
    decodeToken(jwtToDecode: string) {
        return <IUserDetailsJWT>jwt_decode(jwtToDecode)
    }
}

export default new JWTParser();