import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {Layout} from "./components/Layout";
import Home from "./pages/Home";
import AllUsersAppointments from "./pages/AllUsersAppointments";
import {RequireAuth} from "react-auth-kit";
import EstateComponent from "./pages/EstateComponent";


class App extends Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Registration/>}/>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/appointments" element={
                        <RequireAuth loginPath="/login">
                            <AllUsersAppointments/>
                        </RequireAuth>}/>
                    <Route path="/estate" element={<EstateComponent/>}/>
                </Routes>
            </Layout>

        );
    }
}

export default App;