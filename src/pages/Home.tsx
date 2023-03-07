import {Box, Card, CardMedia} from "@mui/material";
import EstateFilterComponent from "./EstateFilterComponent";
import homeImage from "../assets/homePage.webp"
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";

function HomePage() {
const navigate = useNavigate();
    return (
        <>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"} mt="2%">
                <Card sx={{maxWidth: "65%", borderRadius: "25px"}}>
                    <Box sx={{position: 'relative'}}>
                        <CardMedia
                            component="img"
                            image={homeImage}
                        />

                        <Typography variant="h5" style={{
                            textAlign: 'center',
                            position: 'absolute',
                            color: 'black',
                            top: "2%",
                            left: "40%"
                        }}>
                            Find your perfect home
                        </Typography>

                        <Button

                            onClick={()=>navigate("/estate")}
                        >
                           Filter
                        </Button>
                    </Box>
                </Card>
            </Box>

        </>
    )
}

export default HomePage;