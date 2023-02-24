import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Registration from "./components/Registration";
import Home from "./components/Home";
import UserC from "./components/User";
import Navigation from "./components/Navigation";
import AppointmentComponent from "./components/AppointmentComponent";
import EstateComponent from "./components/EstateComponent";

class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/login" element={<UserC/>}/>
                        <Route path="/appointment" element={<AppointmentComponent/>}/>
                        <Route path="/estate" element={<EstateComponent/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}

export default App;