import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "react-auth-kit";
import Registration from "./pages/Registration";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import SessionFinished from "./components/auth/SessionFinished";


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <AuthProvider
            authType={"cookie"}
            authName={"_auth"}
            cookieDomain={window.location.hostname}
            cookieSecure={false}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/*" element={<App/>}/>
                    </Routes>
                </BrowserRouter>
            </LocalizationProvider>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();