
enum Roles{
    ADMIN,  USER
}
export interface IUserDetailsJWT {
    id: number;
    email: string;
    roles: Roles[];
    exp: number;
}