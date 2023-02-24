import React, {useEffect, useState} from "react";

import AppointmentService from "../services/appointment.service";

import Page from "../types/Page";
import Appointment from "../types/Appointment";

function AppointmentComponent() {
    const [appointments, setAppointments] = useState<Page<Appointment>>()


    const getMyAppointments = () => {
        AppointmentService.getAppointmentsByUserId(1, 4, 1).then(res => {
            setAppointments(res.data)
        })
    }
    useEffect(
        () => {
            console.log(appointments)

        }, [appointments]
    )
    return (
        <div>
            {
                Array.isArray(appointments?.content) ?

                    <table className="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Status</th>
                            <th>Estate address</th>
                        </tr>
                        </thead>
                        {
                            appointments?.content.map((result : Appointment) => {
                                return (
                                    <tbody key={result.appointmentStatus}>
                                    <tr>
                                        <td>{appointments?.content?.indexOf(result) + 1}</td>
                                        <td>{result.start}</td>
                                        <td>{result.end}</td>
                                        <td>{result.appointmentStatus}</td>
                                        <td>{result.estate?.address?.fullAddress} {result.estate?.address?.city} {result.estate?.address?.country}</td>
                                    </tr>
                                    </tbody>
                                )
                            })}
                    </table> :
                    <>N</>
            }
            <button onClick={getMyAppointments}>lala</button>
        </div>
    )
}

export default AppointmentComponent;