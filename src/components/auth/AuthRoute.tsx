import {useAuthUser} from "react-auth-kit";
import {Navigate, Outlet, useLocation} from "react-router-dom";
interface Props {
    allowedRoles: string[]
}
export const AuthRoute = ({allowedRoles}:Props) => {
    const authUser = useAuthUser();
    const location = useLocation();

    return (
        authUser()?.roles.find((role: string) => allowedRoles?.includes(role))
            ? <Outlet/>
            : authUser()
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                : <Navigate to="/login" state={{from: location}} replace/>
    )
}
