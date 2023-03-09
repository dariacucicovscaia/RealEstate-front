import {AppBar, Box, Card, CardMedia, Tab, Tabs} from "@mui/material";
import homeImage from "../assets/homePage.webp"
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import React, {useEffect} from "react";


function HomePage() {
    const navigate = useNavigate();

    return (
        <>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"} mt="2%">
                <Card sx={{maxWidth: "75%", maxHeight:"60%", borderRadius: "25px"}}>
                    <Box sx={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            image={homeImage}
                        />

                        <Typography variant="h5" style={{
                            fontFamily: 'Arial',
                            fontWeight: "bold",
                            position: "absolute",
                            top: "7%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}>
                            Find your perfect home
                        </Typography>

                        <Button style={{
                            position: "absolute",
                            top: "13%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: 'black',
                            background: "white",
                            borderRadius: "110px",
                            width:"16%"
                        }}
                                onClick={() => navigate("/estate")}
                        >
                            See estates
                        </Button>

                    </Box>
                </Card>
            </Box>



        </>
    )
}

export default HomePage;