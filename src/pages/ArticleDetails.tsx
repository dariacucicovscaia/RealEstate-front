import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NewsService from "../services/news.service";
import {Box, Divider, Typography} from "@mui/material";
import IArticleDTO from "../types/IArticleDTO";
import img from "../assets/noImage.jpg";
import {Col, Container, Row} from "react-bootstrap";
import ArticlesCommentsList from "../components/news/comments/ArticlesCommentsList";
import {routes} from "../config/routes";

function ArticleDetails() {
    const {id} = useParams();
    const [articleDTO, setArticleDTO] = useState<IArticleDTO>();
    console.log(id)
    useEffect(() => {
        // @ts-ignore
        NewsService.getDetailsOfArticle(id).then(resp =>
            setArticleDTO(resp.data)
        )
    }, [id])
    return (
        <Box sx={{justifyContent: "center", alignItems: "center", display: "flex"}}>
            <Box sx={{width: "70%", mt: "1%"}}>
                <Typography variant="h4">{articleDTO?.title}</Typography>
                <Typography variant="subtitle2" sx={{color: "gray"}}>{articleDTO?.description}</Typography>
                <Divider></Divider>
                <img src={routes.STATIC_CONTENT_URL + articleDTO?.imagePath} width="100%"/>
                <Typography sx={{marginTop: "1%"}} variant="body1">{articleDTO?.content}</Typography>
                <footer>
                    <Container>
                        <Row>
                            <Col className='text-center py-3'>
                                <b>Comments</b>
                                <ArticlesCommentsList articleId={id}/>
                            </Col>
                        </Row>
                    </Container>
                </footer>
            </Box>
        </Box>)
}

export default ArticleDetails;