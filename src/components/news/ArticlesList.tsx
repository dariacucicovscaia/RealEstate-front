import React from "react";
import Page from "../../types/Page";
import {Box, Grid} from "@mui/material";
import IArticle from "../../types/IArticle";
import ArticleCard from "./ArticleCard";


const ArticlesList: React.FC<{ articles: Page<IArticle> }> = ({articles}) => {

    return (
            <Box  sx={{ width: "88%"}}>
                <Grid container spacing={1} columns={16}>

                    {articles?.content.map((article) => {
                        return (

                            <Grid item xs={4} key={article.id}>
                                <ArticleCard article={article} key={article.id}/>
                            </Grid>
                        )
                    })}

                </Grid>
            </Box>

    )
}
export default ArticlesList;