import React, {useEffect, useState} from "react";
import IComment from "../../../types/IComment";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import UserService from "../../../services/user.service";
import {routes} from "../../../config/routes";
import img from '../../../assets/noImage.jpg';
import IDisplayCommentDTO from "../../../types/DisplayCommentDTO";


const Comment: React.FC<{ comment: IDisplayCommentDTO }> = ({comment}) => {
    const [profilePicture, setProfilePicture] = useState<string>();
    useEffect(() => {
        UserService.getProfilePictureOfAUser(comment.externalId).then(resp => {
            console.log(routes.STATIC_CONTENT_URL + resp.data)
            if (resp.data) {
                setProfilePicture(routes.STATIC_CONTENT_URL + resp.data);
            } else {
                setProfilePicture(img)
            }
        })
    }, [comment])

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="U" src={profilePicture}/>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <React.Fragment>
                        <Typography
                            sx={{display: 'inline'}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {comment.firstName} {comment.lastName}
                        </Typography>
                        <Typography variant="body1">  {comment.content}</Typography>

                    </React.Fragment>
                }
            />
        </ListItem>
    )
}
export default Comment;