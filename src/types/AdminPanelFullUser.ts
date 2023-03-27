export default interface AdminPanelFullUser {
    id?: number;
    email: string;
    accountStatus: boolean;
    createdAt: string;
    profilePicture: string;
    firstName: string;
    lastName:string;
    roles : string[];
}