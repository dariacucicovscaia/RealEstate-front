import http from "../config/http-news-microservice";
import IArticleDTO from "../types/IArticleDTO";
import IArticle from "../types/IArticle";


class NewsService {
    saveArticle(article: IArticleDTO){
        return http.post<IArticle>(`/api/v1/news/article`, article);
    }
}
export default new NewsService();