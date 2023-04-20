import IUserNews from "./IUserNews";

export default interface IComment{
    id: number;
    user: IUserNews;
    content :string;
    creationDate:number;
    lastUpdated:number;

}