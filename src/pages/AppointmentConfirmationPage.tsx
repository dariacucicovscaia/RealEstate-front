import {useAuthHeader, useIsAuthenticated} from "react-auth-kit";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import AppointmentService from "../services/appointment.service";

const AppointmentConfirmationPage = () => {
    const auth = useIsAuthenticated();
    const authHeader = useAuthHeader();

    const loaded = useState(false);
    const [appointmentStatus, setAppointmentStatus] = useState<string>();
    const {appointmentId} = useParams();

    useEffect(() => {
        console.log(appointmentId)
        // @ts-ignore
        AppointmentService.confirmAppointment(appointmentId, authHeader()).then((res) => {
            setAppointmentStatus(res.data)
        })
    }, [loaded])

    return (
        <div className="container">
            {
                auth() ?
                    <>
                        {appointmentStatus ?
                            <>
                                Your appointment status has been changed, you can truther navigate our website
                            </>
                            :
                            <>
                                Something went wrong, please try again
                            </>
                        }

                    </>
                    :
                    <>
                        <p>We noticed that you are not yet logged in. You can do that by clicking <a href="/login">here</a> or by using
                            the link on the top menu.</p>
                        <div>


                        </div>
                    </>
            }
        </div>
    )
}
export default AppointmentConfirmationPage;