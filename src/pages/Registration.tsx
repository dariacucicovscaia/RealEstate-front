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

function Registration() {
    const {register, handleSubmit} = useForm<RegistrationDTO>();
    const [user, setUser] = useState<User>();

    const onSubmit = handleSubmit(data => {
        UserService.createUser(data).then(res => {
            setUser(res.data)
        })
        console.log(user)
    })
    return (
        <>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
                 sx={{margin: "20px 0px", outline: "outlined"}}>

                <Grid sx={{width: '45%'}}>
                    <br/>
                    <br/>
                    <Stack>
                        <Typography variant="h4">
                            Register
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="body2">
                            Already have an account?
                            &nbsp;
                            <Link
                                href="/src/pages/Login"
                                underline="hover"
                                variant="subtitle2"
                                sx={{
                                    color: "red",
                                    fontWeight: "bolder"
                                }}
                            >
                                Log in
                            </Link>
                        </Typography>
                    </Stack>
                    <br/>
                    <br/>
                    <FormGroup  defaultValue="rounded">

                        <FormControl>
                            <TextField  {...register('email')} id="email" label="email" type="text" sx={{m: 0.50}}/>
                            {/*<FormHelperText id="email">We'll never share your email.</FormHelperText>*/}
                        </FormControl>
                        <FormControl>
                            <TextField {...register('password')} id="password" label="password" type="password"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('firstName')} id="firstName" label="firstName" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('lastName')} id="lastName" label="lastName" type="text"
                                       sx={{m: 0.50}}/>
                        </FormControl>
                        <FormControl>
                            <TextField {...register('phoneNumber')} id="phoneNumber" label="phoneNumber" type="text"
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
                    </FormGroup>
                    <br/><br/>
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

export default Registration;