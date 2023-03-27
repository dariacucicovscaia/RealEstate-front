import React, {useEffect, useState} from "react";
import UserService from "../services/user.service";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider, Grid,
    Typography
} from '@mui/material';
import Cookies from "universal-cookie";
import EditProfile from "./EditProfile";
import IProfile from "../types/IProfile";
import axios from "axios";

const ProfilePage = () => {
    const [loaded, setLoaded] = useState(false)
    const auth = useAuthUser();
    const authHeader = useAuthHeader();
    const [user, setUser] = useState<AdminPanelFullUser>()
    const [profilePicture, setProfilePicture] = useState<IProfile>()
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

        UserService.addProfilePicture(fileUploaded.name, auth()?.id, authHeader()).then((response) => {
                setProfilePicture(response.data)
            }
        )
        const data = new FormData();
        data.append('file', fileUploaded)
        axios.post('http://localhost:5000/upload', data,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => console.log(response))
            .catch((e) => console.error(e))

    };

    useEffect(() => {
        UserService.getUserDetails(auth()?.id, authHeader()).then((resp) => {
                setUser(resp.data)
                cookies.set('userProfileUpdate', resp.data)
            }
        )
    }, [loaded, profilePicture])

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
                                            src={user?.profilePicture}
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
                        <EditProfile/></Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfilePage;