import React, {Component} from "react";
import {Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./pages/Login";
import {Layout} from "./components/Layout";
import AllUsersAppointments from "./pages/AllUsersAppointments";
import {RequireAuth} from "react-auth-kit";
import AdminPanel from "./pages/AdminPanel";
import {AuthRoute} from "./components/auth/AuthRoute";
import EstateDetails from "./components/estate/EstateDetails";
import EstateFilterComponent from "./pages/EstateFilterComponent";
import OwnerEstates from "./pages/OwnersEstates";
import SessionFinished from "./components/auth/SessionFinished";
import AppointmentConfirmationPage from "./pages/AppointmentConfirmationPage";
import DynamicAppProperties from "./pages/DynamicAppProperties";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";
import EditProfile from "./components/EditProfile";
import CreateEstateForm from "./components/multistep/CreateEstateForm";
import Registration from "./pages/Registration";
import NewArticleForm from "./components/news/NewArticleForm";
import ArticlePage from "./pages/ArticlePage";
import ArticleDetails from "./pages/ArticleDetails";

class App extends Component {
    render() {
        return (
            <SessionFinished>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/" element={<EstateFilterComponent/>}/>
                        <Route path="/register" element={<Registration/>}/>
                        <Route path="/appointments" element={
                            <RequireAuth loginPath="/login">
                                <AllUsersAppointments/>
                            </RequireAuth>}
                        />
                        <Route path="/editProfile" element={
                            <RequireAuth loginPath="/login">
                                <EditProfile/>
                            </RequireAuth>}
                        />
                        <Route path="confirm-appointment/:appointmentId" element={<AppointmentConfirmationPage/>}/>
                        <Route path="/details/:id" element={<EstateDetails/>}/>
                        <Route path="/article-page" element={<ArticlePage/>}/>
                        <Route path="/article/:id" element={<ArticleDetails/>}/>
                        <Route element={<AuthRoute allowedRoles={["ADMIN"]}/>}>
                            <Route path="/adminPanel" element={<AdminPanel/>}/>
                            <Route path="/dynamic-app-props" element={<DynamicAppProperties/>}/>
                        </Route>
                        <Route element={<AuthRoute allowedRoles={["AUTHOR"]}/>}>
                            <Route path="/create-new-article" element={<NewArticleForm/>}/>
                        </Route>
                        <Route element={<AuthRoute allowedRoles={["USER"]}/>}>
                            <Route path="/myAppointments" element={<AllUsersAppointments/>}/>

                            <Route path="/profile" element={<ProfilePage/>}/>
                            <Route path="/registerEstate" element={<CreateEstateForm/>}/>
                            <Route path="/allMyEstates" element={<OwnerEstates/>}/>
                        </Route>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Layout>
            </SessionFinished>

        );
    }
}

export default App;