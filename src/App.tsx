import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import {Layout} from "./components/Layout";
import Home from "./pages/Home";
import AllUsersAppointments from "./pages/AllUsersAppointments";
import {RequireAuth} from "react-auth-kit";
import AdminPanel from "./pages/AdminPanel";
import {AuthRoute} from "./components/AuthRoute";
import EstateDetails from "./components/EstateDetails";
import EstatePage from "./pages/EstatePage";


class App extends Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/appointments" element={
                        <RequireAuth loginPath="/login">
                            <AllUsersAppointments/>
                        </RequireAuth>}/>
                    <Route path="/estate" element={<EstatePage />}/>
                    <Route path="/details/:id"  element = {<EstateDetails/>}/>

                    <Route element={<AuthRoute allowedRoles={["ADMIN"]}/>}>
                        <Route path="/adminPanel" element={<AdminPanel/>}/>
                    </Route>
                </Routes>
            </Layout>

        );
    }
}

export default App;