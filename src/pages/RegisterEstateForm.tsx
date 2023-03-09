import React, {useState} from "react";
import {useForm} from "react-hook-form";
import UserService from "../services/user.service";
import User from "../types/User";
import {
    FormControl,
    FormGroup,
    Grid,
    Link,
    Stack,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import EstateDTO from "../types/EstateDTO";
import EstateService from "../services/estate.service";
import {useAuthUser} from "react-auth-kit";


type RegistrationDTO = {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber: string
    fullAddress: string
    city: string
    country: string
}

function EstateRegistration() {
    const {register, handleSubmit, setValue} = useForm<EstateDTO>();
    const [estate, setEstate] = useState<EstateDTO>();
    const navigate = useNavigate();
    const authUser = useAuthUser();

    const onSubmit = handleSubmit(data => {
        setValue('email', authUser()?.email)
        EstateService.createEstateWithAllDetails(data).then(res => {
            setEstate(res.data)
        })
        console.log(estate)
    })
    return (
        <>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
                 sx={{margin: "0.05%", outline: "outlined"}}>

                <Grid sx={{width: '45%'}}>
                    <br/>
                    <br/>
                    <Stack>
                        <Typography variant="h4">
                            Register Your Estate
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="body2">
                            View all your estates
                            &nbsp;
                            <Link
                                href="login"
                                underline="hover"
                                variant="subtitle2"
                                sx={{
                                    color: "red",
                                    fontWeight: "bolder"
                                }}
                            >
                                here
                            </Link>
                        </Typography>
                    </Stack>
                    <br/>
                    <FormGroup defaultValue="rounded">
                        <FormControl>
                            <TextField {...register('squareMeters')} id="squareMeters" label="squareMeters" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('numberOfRooms')} id="numberOfRooms" label="numberOfRooms" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('numberOfBathRooms')} id="numberOfBathRooms" label="numberOfBathRooms" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('numberOfGarages')} id="numberOfGarages" label="numberOfGarages" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl> <FormControl>
                        <TextField {...register('yearOfConstruction')} id="yearOfConstruction" label="yearOfConstruction" type="text"
                                   sx={{m: 0.50}}/>
                    </FormControl> <FormControl>
                        <TextField {...register('typeOfEstate')} id="typeOfEstate" label="typeOfEstate" type="text"
                                   sx={{m: 0.50}}/>
                    </FormControl>
                        <FormControl>
                            <TextField {...register('fullAddress')} id="fullAddress" label="fullAddress" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('city')} id="city" label="city" type="text" sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('country')} id="country" label="country" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('price')} id="price" label="price" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('currency')} id="currency" label="currency" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                    </FormGroup>
                    <br/>
                    <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                        <Button onClick={onSubmit} sx={{
                            background: "red",
                            color: "white",
                            fontWeight: "bolder",
                            m: 0.50,
                            width: '25%',
                            borderRadius: 2
                        }}>
                            Register
                        </Button>
                    </Box>
                </Grid></Box>


        </>
    )

}

export default EstateRegistration;