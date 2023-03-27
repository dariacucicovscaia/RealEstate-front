import React, {useState} from "react";
import LoginDTO from "../types/LoginDTO";
import LoginService from "../services/login.service";
import {useForm} from "react-hook-form";
import {Alert, Box, FormControl, FormGroup, Grid, Input, InputLabel, Link, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import JwtService from "../services/jwt.service";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import {useSignIn} from "react-auth-kit";
import UserService from "../services/user.service";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import Cookies from "universal-cookie";

const Login = () => {
    const {register, handleSubmit} = useForm<LoginDTO>();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const refresh = () => window.location.reload()
    const [user, setUser] = useState<AdminPanelFullUser>()
    const cookies = new Cookies();

    const onLogin = handleSubmit(loginDTO => {

        LoginService.login(loginDTO).then(res => {
            const token = JwtService.decodeToken(res.data.token)
            signIn({
                token: res.data.token,
                tokenType: res.data.type,
                expiresIn: +token.exp,
                authState: {id: token.id, email: token.email, roles: token.roles}
            })
            console.log("signed in " + token.email)
            UserService.getUserDetails(token.id, "Bearer " + res.data.token).then((resp) => {

                    setUser(resp.data)
                    cookies.set('userProfileUpdate', resp.data)
                    console.log("done")
                }
            )
            navigate("/")
            refresh()

        }).catch((function (error) {
            if (error.response) {
                setError(error.response.data.message);
            }
        }))
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
                                color: "#728c69",
                                fontWeight: "bolder"
                            }}
                        >
                            Create account
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
                        background: "#728c69",
                        color: "white",
                        fontWeight: "bolder",
                        m: 0.50,
                        width: '25%',
                        borderRadius: 2
                    }}>
                        Login
                    </Button>
                </Box>
                <br/>
                <br/>
                <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                    {error ?
                        <Alert severity={"error"} sx={{width: "100%"}}>{error}</Alert>
                        : <></>
                    }
                </Box>

            </Grid></Box>
    )
}

export default Login;