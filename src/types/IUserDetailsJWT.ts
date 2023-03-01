
enum Roles{
    ADMIN, SELLER, USER
}
export interface IUserDetailsJWT {
    id: number;
    email: string;
    roles: Roles[];
    exp: string;
}