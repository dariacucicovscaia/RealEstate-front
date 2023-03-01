import React, {useContext, useEffect, useState} from "react";
import LoginDTO from "../types/LoginDTO";
import LoginService from "../services/login.service";
import {useForm} from "react-hook-form";
import {Box, FormControl, FormGroup, Grid, Input, InputLabel, Link, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import JwtService from "../services/jwt.service";
import {useSignIn} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";


const Login = () => {
    const {register, handleSubmit} = useForm<LoginDTO>();
    const signIn = useSignIn();
    const navigate = useNavigate();

    const onLogin = handleSubmit(loginDTO => {
        LoginService.login(loginDTO).then(res => {
            const token = JwtService.decodeToken(res.data)
            signIn({
                token: res.data,
                tokenType: "Bearer ",
                expiresIn: +token.exp,
                authState: {id: token.id, email: token.email, roles: token.roles}
            })
            console.log("signed in " + token.email)
            navigate("/")
        })
    })

    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
             sx={{margin: "20px 0px", outline: "outlined"}}>

            <Grid sx={{width: '30%'}}>
                <br/>
                <br/>
                <Stack>
                    <Typography variant="h4">
                        Sign in
                    </Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2">
                        Don't have an account?
                        &nbsp;
                        <Link
                            href="/register"
                            underline="hover"
                            variant="subtitle2"
                            sx={{
                                color: "red",
                                fontWeight: "bolder"
                            }}
                        >
                            Register
                        </Link>
                    </Typography>
                </Stack>
                <br/>
                <br/>
                <FormGroup defaultValue="rounded">
                    <FormControl>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input  {...register('email')} id="email" name="email" type="text" sx={{m: 1.5}}/>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input {...register('password')} id="password" name="password" type="password" sx={{m: 1.5}}/>
                    </FormControl> </FormGroup>
                <br/><br/>
                <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                    <Button onClick={onLogin} sx={{
                        background: "red",
                        color: "white",
                        fontWeight: "bolder",
                        m: 0.50,
                        width: '25%',
                        borderRadius: 2
                    }}>
                        Login
                    </Button>
                </Box>

            </Grid></Box>
    )
}

export default Login;