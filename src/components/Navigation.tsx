import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {useAuthHeader, useAuthUser, useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import {useEffect, useState} from "react";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import {styled} from "@mui/material/styles";
import MenuIcon from '@mui/icons-material/Menu';
import {AccountCircle, EditOutlined, LogoutOutlined, PersonOutline} from "@mui/icons-material";
import UserService from "../services/user.service";
import {Avatar, CardContent, Grid, ListItemIcon, ListItemText, Menu, Stack} from "@mui/material";
import AdminPanelFullUser from "../types/AdminPanelFullUser";
import EditProfile from "../pages/EditProfile";
import Dialog from "@mui/material/Dialog";

const DrawerHeader = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
}));

function ResponsiveAppBar() {
    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut();
    const navigate = useNavigate();
    const authUser = useAuthUser();
    const authHeader = useAuthHeader();
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [user, setUser] = useState<AdminPanelFullUser>();
    const [popoverEditUser, setPopoverEditUser] = useState(false)

    const logout = () => {
        signOut();
        navigate("/")
    }
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseEditUser = () => {
        setPopoverEditUser(false);
    };

    useEffect(() => {
        UserService.getUserDetails(authUser()?.id, authHeader()).then(
            (resp) => {
                setUser(resp.data);
            }
        )
    }, [])

    return (<>
            <AppBar position="static" sx={{
                background: "white",
            }}>
                <Drawer

                    variant="persistent"
                    anchor="left"
                    open={open}
                    onClose={(_, reason) =>
                        reason === 'backdropClick' && setOpen(false)
                    }
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {<ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <List>
                        {
                            authUser()?.roles.map((role: string) => {
                                if (role === 'USER') {
                                    return (
                                        <>
                                            <ListItemButton
                                                key={role}
                                                sx={{
                                                    mr: 2,
                                                    color: 'black',
                                                    fontWeight: "bolder",
                                                    background: "white",
                                                    borderRadius: "8px",
                                                    width: "100%"
                                                }}
                                                href="/myAppointments"
                                            >
                                                Appointments
                                            </ListItemButton>
                                            <ListItemButton
                                                key={role}
                                                sx={{
                                                    mr: 2,
                                                    color: 'black',
                                                    fontWeight: "bolder",
                                                    width: "100%",
                                                    background: "white",
                                                    borderRadius: "8px"
                                                }}
                                                href="/registerEstate"
                                            >
                                                Add property
                                            </ListItemButton>
                                            <ListItemButton
                                                key={role}
                                                sx={{
                                                    mr: 2,
                                                    color: 'black',
                                                    fontWeight: "bolder",
                                                    width: "100%",
                                                    background: "white",
                                                    borderRadius: "8px"
                                                }}
                                                href="/allMyEstates"
                                            >
                                                All my estates
                                            </ListItemButton>
                                            <ListItemButton
                                                key={role}
                                                sx={{
                                                    mr: 2,
                                                    color: 'black',
                                                    fontWeight: "bolder",
                                                    width: "100%",
                                                    background: "white",
                                                    borderRadius: "8px"
                                                }}
                                                href="/profile"
                                            >
                                                My profile
                                            </ListItemButton>

                                        </>
                                    )
                                }

                                if (role === 'ADMIN') {
                                    return (<>
                                            <Divider></Divider>
                                            <ListItemButton
                                                key={role}
                                                sx={{
                                                    mr: 2,
                                                    color: 'black',
                                                    fontWeight: "bolder",
                                                    width: "100%",
                                                    background: "white",
                                                    borderRadius: "8px"
                                                }}
                                                href="/adminPanel"
                                            >
                                                Admin Panel
                                            </ListItemButton> <ListItemButton
                                            key={role}
                                            sx={{
                                                mr: 2,
                                                color: 'black',
                                                fontWeight: "bolder",
                                                width: "100%",
                                                background: "white",
                                                borderRadius: "8px"
                                            }}
                                            href="/dynamic-app-props"
                                        >
                                            Dynamic Configurations
                                        </ListItemButton></>
                                    )
                                }

                            })
                        }</List>
                </Drawer>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        {
                            authUser()?.roles.map((role: string) => {
                                if (role === 'USER') {
                                    return (
                                        <>
                                            <Box justifyContent={"left"} alignItems={"left"} display={"flex"}
                                                 sx={{
                                                     flexGrow: 1,
                                                 }}>
                                                <IconButton
                                                    key={role}
                                                    size="large"
                                                    edge="start"
                                                    aria-label="menu"
                                                    sx={{color: 'black'}}
                                                    onClick={() => setOpen(true)}
                                                >
                                                    <MenuIcon/>
                                                </IconButton>

                                                <Typography
                                                    justifyContent={"left"} alignItems={"left"} display={"flex"}
                                                    variant="h6"
                                                    component="a"
                                                    href="/"
                                                    sx={{
                                                        m: 1,
                                                        fontFamily: 'Arial',
                                                        fontWeight: "bolder",
                                                        color: 'black',
                                                    }}
                                                >
                                                    RealEstate
                                                </Typography>
                                            </Box>
                                        </>
                                    )
                                }


                            })
                        }
                        {
                            isAuthenticated() && (
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        onClick={handleMenu}

                                    >
                                        <Stack direction="row" alignItems="center">
                                            {
                                                user?.profilePicture ?
                                                    <Avatar alt="Remy Sharp" sx={{mr: 1}} src={user?.profilePicture}/>
                                                    :
                                                    <AccountCircle sx={{
                                                        color: "gray",
                                                        mr: 1
                                                    }}/>
                                            }
                                            <Typography
                                                variant="subtitle1" sx={{mt: 0.4, color: "black"}}>
                                                {user?.firstName} {user?.lastName}
                                            </Typography>
                                        </Stack>

                                    </IconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    > <CardContent sx={{px: 2.5, pt: 3}}>
                                        <Grid container justifyContent="space-between" alignItems="center">
                                            <Grid item>
                                                <Stack direction="row" spacing={1.25} alignItems="center">
                                                    {
                                                        user?.profilePicture ?
                                                            <Avatar alt="Remy Sharp" src={user?.profilePicture}/>
                                                            :
                                                            <AccountCircle sx={{
                                                                color: "gray",
                                                            }}/>
                                                    }
                                                    <Stack>
                                                        <Typography
                                                            variant="body2"
                                                            color="black"
                                                        >
                                                            {user?.firstName} {user?.lastName}
                                                        </Typography>
                                                    </Stack>
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    size="large"
                                                    onClick={logout}
                                                >
                                                    <LogoutOutlined/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                        <List component="nav" sx={{
                                            p: 0,
                                        }}>
                                            <ListItemButton
                                                onClick={() => {
                                                    setPopoverEditUser(true)
                                                    handleClose()
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <EditOutlined/>
                                                </ListItemIcon>
                                                <ListItemText primary="Edit Profile"/>
                                            </ListItemButton>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate("/profile")
                                                    handleClose()
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <PersonOutline/>
                                                </ListItemIcon>
                                                <ListItemText primary="View Profile"/>
                                            </ListItemButton>
                                        </List>
                                    </Menu>

                                </div>
                            )}
                        {
                            isAuthenticated() ? <Box>
                                </Box>
                                :
                                <>
                                    <Typography
                                        justifyContent={"left"} alignItems={"left"} display={"flex"}
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
                                    <Box>
                                        <Button
                                            href="/login"
                                            sx={{
                                                mr: 2,
                                                color: 'white',
                                                background: "#728c69",
                                                borderRadius: "8px"
                                            }}
                                        >
                                            Sign in
                                        </Button>

                                    </Box>
                                </>
                        }
                    </Toolbar>
                </Container>
            </AppBar>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
            <Dialog open={popoverEditUser} onClose={handleCloseEditUser}>
                <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                    <EditProfile/>
                </Box>

            </Dialog></Box>
        </>
    )
        ;
}

export default ResponsiveAppBar;