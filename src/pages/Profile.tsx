import React, {useEffect, useState} from "react";
import UserService from "../services/user.service";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import {Avatar, Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography} from '@mui/material';
import Cookies from "universal-cookie";
import EditProfile from "../components/EditProfile";
import IProfile from "../types/IProfile";
import axios from "axios";
import {routes} from "../config/routes";

const ProfilePage = () => {
    const [loaded, setLoaded] = useState(false)
    const auth = useAuthUser();
    const authHeader = useAuthHeader();
    const [user, setUser] = useState<AdminPanelFullUser>()
    const [updatedProfile, setUpdatedProfile] = useState<IProfile>()
    const [profilePic, setProfilePic] = useState<string>()
    const cookies = new Cookies();


    const hiddenFileInput = React.useRef(null);

    const handleClick = (event: any) => {
        // @ts-ignore
        hiddenFileInput.current.click();
    };
    // @ts-ignore
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        console.log(fileUploaded)
        const userEmail = auth()?.email.substring(0, auth()?.email.lastIndexOf("@"))

        UserService.addProfilePicture(("/profileImg/" + userEmail + "/" + fileUploaded.name), auth()?.id, authHeader()).then((response) => {
                setUpdatedProfile(response.data)
            }
        )
        const data = new FormData();
        data.append('file', fileUploaded)
        data.append('userName', userEmail)
        axios.post(routes.STATIC_CONTENT_URL + '/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response)
                setProfilePic(routes.STATIC_CONTENT_URL + response.data?.fileName)
            })
            .catch((e) => console.error(e))

    };

    useEffect(() => {
        UserService.getUserDetails(auth()?.id, authHeader()).then((resp) => {
                setUser(resp.data)
                cookies.set('userProfileUpdate', resp.data)
            }
        )
    }, [loaded, profilePic])

    return (
        <div>
            <Grid sx={{margin: '5%'}}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6}>
                        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                            <Card sx={{width: "70%", mt: 21}}>
                                <h3 style={{
                                    margin: "5px",
                                    alignItems: "center",
                                    display: "flex",
                                    justifyContent: "center"
                                }}> Profile Page</h3>
                                <Divider></Divider>
                                <CardContent>
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column'
                                        }}
                                    >
                                        <Avatar
                                            src={routes.STATIC_CONTENT_URL + user?.profilePicture}
                                            sx={{
                                                height: 80,
                                                mb: 2,
                                                width: 80
                                            }}
                                        />
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                        >
                                            {user?.firstName} {user?.lastName}
                                        </Typography>
                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                        >
                                            {user?.roles}
                                        </Typography>

                                    </Box>
                                </CardContent>
                                <Divider/>
                                <CardActions>

                                    <Button
                                        fullWidth
                                        sx={{
                                            background: "white",
                                            color: "black",
                                            fontWeight: "bolder",
                                            m: 0.50,
                                            width: '100%',
                                            borderRadius: 2
                                        }}
                                        onClick={handleClick}
                                    >
                                        Upload picture
                                    </Button>

                                    <input type="file"
                                           ref={hiddenFileInput}
                                           onChange={handleChange}
                                           style={{display: 'none'}}
                                    />


                                </CardActions>
                            </Card>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <EditProfile/>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfilePage;