import http from "../config/http-news-microservice";
import IArticleDTO from "../types/IArticleDTO";
import IArticle from "../types/IArticle";
import Page from "../types/Page";
import IComment from "../types/IComment";
import IUserNews from "../types/IUserNews";
import IDisplayCommentDTO from "../types/DisplayCommentDTO";


class NewsService {
    saveArticle(article: IArticleDTO){
        return http.post<IArticle>(`/api/v1/news/article`, article);
    }

    getAllArticlesPaginated( page: number, size: number) {
        return http.get<Page<IArticle>>(`/api/v1/news/article/latest`, {
            params: {
                page: page,
                size: size
            }
        });
    }
    getDetailsOfArticle (id: number){
        return http.get<IArticleDTO>(`/api/v1/news/article/details/${id}`);
    }

    getAllCommentsOfAnArticle(articleId: number, page: number, size: number) {
        return http.get<Page<IDisplayCommentDTO>>(`/api/v1/news/comment/${articleId}`,{
            params: {
                page: page,
                size: size
            }
        } );
    }

    saveComment(id: number, articleId: number, commentContent: string) {
        return http.post<IComment>(`/api/v1/news/comment`, {
            externalId: id,
            articleId: articleId,
            content: commentContent
        })
    }
    createUser(externalUserId: number, firstName:string, lastName:string ){
        return http.post<IUserNews>(`/api/v1/news/user`, {
            externalId:externalUserId,
            firstName: firstName,
            lastName: lastName
        })
    }
}
export default new NewsService();