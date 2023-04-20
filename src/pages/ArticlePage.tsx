import {useEffect, useState} from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NewsService from "../services/news.service";
import ArticlesList from "../components/news/ArticlesList";
import IArticle from "../types/IArticle";
import Page from "../types/Page";

const ArticlePage = () => {
    const [pageA, setPageA] = useState<number>(1);
    const [articles, setArticles] = useState<Page<IArticle>>({
        content: [],
        currentPage: 0,
        elementsPerPage: 0,
        totalElements: 0
    });
    useEffect(() => {
        NewsService.getAllArticlesPaginated(pageA, 5).then(
            resp => {
                setArticles(resp.data)
            }
        )
    }, [pageA])

    return (<>
        <ArticlesList articles={articles}></ArticlesList>
    </>)
}
export default ArticlePage;