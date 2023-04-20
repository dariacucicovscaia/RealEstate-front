import IComment from "./IComment";
import IArticleContent from "./IArticleContent";
import IUserNews from "./IUserNews";
import IImageCapture from "./IImageCapture";



export default interface IArticle{
    id: number;
    articleContent: IArticleContent;
    user: IUserNews;
    published :boolean;
    creationDate:number;
    lastUpdated:number;
    comments :IComment[];
    image: IImageCapture;
}
