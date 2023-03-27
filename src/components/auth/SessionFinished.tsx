import React, {useEffect, useState} from "react";
import {Alert, AlertTitle} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import JwtService from "../../services/jwt.service";
import {useAuthHeader, useSignOut} from "react-auth-kit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


const SessionFinished: React.FC<{ children: any }> = ({children}) => {
    const authHeader = useAuthHeader();
    const [alert, setAlert] = useState<boolean>(false);
    const navigate = useNavigate();
    const signOut = useSignOut();

    useEffect(() => {
        if (authHeader()) {
            const token = authHeader().slice(authHeader().indexOf(" "))
            setAlert(!JwtService.checkIfTokenIsValid(token))
        }

    }, [children])

    return (
        <>
            <div>
                {children}
            </div>
            <Dialog open={alert}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    <strong>Session expired </strong> please follow the login button to re-authenticate
                    <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                        <Button onClick={() => {
                            navigate("/login");
                            signOut();
                            setAlert(false);
                        }}
                                sx={{
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
                </Alert>
            </Dialog>


        </>
    )
}

export default SessionFinished;