import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = [''];

function ResponsiveAppBar() {

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

                    <Box sx={{flexGrow: 0}}>

                        <Button
                            href="/register"
                            sx={{
                                mr: 2,
                                color: 'black',
                                background: "white",
                                borderRadius: "8px"
                            }}
                        >
                            Register
                        </Button>
                    </Box>
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
                            Sign up
                        </Button>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;