import IComment from "./IComment";
import IArticleContent from "./IArticleContent";

export default interface IUserNews{
    id: number;
    externalId: number;
    firstName: string;
    lastName: string;
}

export default interface IArticle{
    id: number;
    articleContent: IArticleContent;
    user: IUserNews;
    isPublished :boolean;
    creationDate:number;
    lastUpdated:number;
    comments :IComment[];
}
