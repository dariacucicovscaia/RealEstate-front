import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";

function ResponsiveAppBar() {
    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut();
    const navigate = useNavigate();
    const authUser = useAuthUser();

    const logout = () => {
        signOut();
        navigate("/")
    }


    return (
        <AppBar position="static" sx={{
            background: "white",
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            flexGrow: 1,
                            mr: 3,
                            fontFamily: 'Arial',
                            fontWeight: "bolder",
                            color: 'black',
                        }}
                    >
                        RealEstate
                    </Typography>
                    {
                        authUser()?.roles.map((role: string) => {
                            if (role === 'ADMIN') {
                                return (
                                    <Button
                                        sx={{
                                            mr: 2,
                                            display: {xs: 'none', md: 'flex'},
                                            color: 'black',
                                            fontWeight:"bolder",
                                            background: "white",
                                            borderRadius: "8px"
                                        }}
                                        href="/adminPanel"
                                    >
                                        Admin Panel
                                    </Button>
                                )
                            }
                            if(role === 'SELLER'){
                                return (
                                    <Button
                                        sx={{
                                            mr: 2,
                                            display: {xs: 'none', md: 'flex'},
                                            color: 'black',
                                            fontWeight:"bolder",
                                            background: "white",
                                            borderRadius: "8px"
                                        }}
                                        href="/registerEstate"
                                    >
                                       Register Property
                                    </Button>
                                )
                            }
                        })
                    }
                    {
                        isAuthenticated() ? <Box sx={{flexGrow: 0}}>
                                <Button
                                    sx={{
                                        mr: 2,
                                        display: {xs: 'none', md: 'flex'},
                                        color: 'white',
                                        background: "red",
                                        fontWeight:"bolder",
                                        borderRadius: "8px"
                                    }}
                                    onClick={logout}
                                >
                                    Sign out
                                </Button>


                            </Box>
                            :
                            <>
                                <Box sx={{flexGrow: 0}}>
                                    <Button
                                        href="/login"
                                        sx={{
                                            mr: 2,
                                            display: {xs: 'none', md: 'flex'},
                                            color: 'white',
                                            background: "red",
                                            borderRadius: "8px"
                                        }}
                                    >
                                        Sign in
                                    </Button>

                                </Box></>
                    }

                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;