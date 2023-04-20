import React from "react";
import IArticle from "../../types/IArticle";
import {format} from "date-fns";
import img from "../../assets/noImage.jpg"
import {Box, Card, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes";
// @ts-ignore
const ArticleTitle = ({title}) => {
    return (
        <Box>
            <Typography
                variant="h6"
                sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                }}>
                {title}
            </Typography>
        </Box>
    );
};
const ArticleCards: React.FC<{ article: IArticle }> = ({article}) => {
    const navigate = useNavigate();
    var date = new Date(article.creationDate);
    var formattedDate = format(date, "MMMM do, yyyy H:mma");

    return (

        <Card  onClick={() => navigate("/article/" + article.id)}>
            <img className="card-img-top" style={{height:"200px"}} src={routes.STATIC_CONTENT_URL + article.image.path} alt={article.image.capture}/>
            <CardContent  sx={{height:250}}>
                <ArticleTitle title={article.articleContent.title} />

                <Typography variant="body2" color="text.secondary"  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "5",
                    WebkitBoxOrient: "vertical",
                }}>
                    {article.articleContent.description}
                </Typography>

            </CardContent>
            <div className="card-footer" >
                {formattedDate}
            </div>
        </Card>
    )
}
export default ArticleCards;