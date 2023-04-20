import React, {SyntheticEvent, useEffect, useState} from "react";
import IComment from "../../../types/IComment";
import {
    Avatar,
    Box,
    Button,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography
} from "@mui/material";
import NewsService from "../../../services/news.service";
import Comment from "./Comment";
import Page from "../../../types/Page";
import {EditorState} from "draft-js";
import {useAuthUser} from "react-auth-kit";
import IDisplayCommentDTO from "../../../types/DisplayCommentDTO";

const ArticlesCommentsList: React.FC<{ articleId: string | undefined }> = ({articleId}) => {
    const [size, setSize] = useState(5);
    const initialSize = 5;
    const [comments, setComments] = useState<Page<IDisplayCommentDTO>>();
    const [commentCreated, setCommentCreated] = useState<IComment>();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [commentContent, setCommentContent] = useState<string>("");
    const user = useAuthUser();

    const submitComment = () => {
        console.log(user()?.id)
        console.log(articleId)
        console.log(commentContent)

        // @ts-ignore
        NewsService.saveComment(user()?.id, articleId, commentContent).then(resp => {
            setCommentCreated(resp.data)
            console.log(resp.data)
        })

    }

    const onEditorStateChange = (e: EditorState) => {
        setEditorState(e)
    }
    const showMore = () => {
        setSize(size + initialSize)
    }
    const showLess = () => {
        setSize(size - initialSize)
    }
    useEffect(() => {
        // @ts-ignore
        NewsService.getAllCommentsOfAnArticle(articleId, 1, size).then(resp => {
            setComments(resp.data)
        })
    }, [size, commentCreated])

    return (
        <>
            <Box>
                {comments?.content.map((comment) => {
                    return (
                        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                            <Comment comment={comment}/>
                        </List>
                    )
                })}
            </Box>
            <Grid container spacing={2}
                  sx={{width: "100%", justifyContent: "center", alignItems: "center", display: "flex"}}>
                <Grid item>
                    <Button onClick={showMore}
                            sx={{
                                background: "white",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                width: '100%',
                                borderRadius: 2,
                            }}>
                        Show more
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={showLess}
                            sx={{
                                background: "white",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                width: '100%',
                                borderRadius: 2,
                            }}>
                        Show less
                    </Button>
                </Grid>
            </Grid>

            <Typography variant="subtitle1">Add a comment</Typography>
            <TextField fullWidth={true} value={commentContent} onChange={e => {
                setCommentContent(e.target.value)
            }}>
            </TextField>
            <Button onClick={submitComment} sx={{
                background: "white",
                color: "black",
                fontWeight: "bolder",
                m: 0.50,
                width: '100%',
                borderRadius: 2,

            }}>Submit</Button>
        </>
    )
}
export default ArticlesCommentsList;