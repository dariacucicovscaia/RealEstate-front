import React, {useEffect, useState} from "react";

import AppointmentService from "../services/appointment.service";
import Page from "../types/Page";
import Appointment from "../types/Appointment";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import {Button, Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";

function AllUsersAppointments() {
    const [appointments, setAppointments] = useState<Page<Appointment>>()
    const [page, setPage] = useState<number>(1);
    const pageSize = 8;
    const [loaded, setLoaded] = useState(false);
    const authHeader = useAuthHeader();
    const authUser = useAuthUser();
    const navigate = useNavigate();


    const getPageNumber = () => {
        let nrOfPages = 0;
        if (appointments) {
            nrOfPages = Math.ceil(appointments?.totalElements / appointments?.elementsPerPage);
        }
        return nrOfPages;
    }
    // @ts-ignore
    const handleChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
            AppointmentService.getAppointmentsByUserId(authUser()?.id, pageSize, page, authHeader()).then(res => {
                setAppointments(res.data)
            })
            console.log(page)
        }, [page, loaded]
    )

    return (
        <div className="container">
            {appointments && Array.isArray(appointments?.content) && (appointments?.content.length >= 1) ?
                <>
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
                        {appointments?.content.map((result: Appointment) => {
                            return (


                                    <tbody key={appointments?.content?.indexOf(result) + 1}>
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
                    </table>
                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{
                        margin: "20px 0px"
                    }}>
                        <Pagination size="large" count={getPageNumber()} page={page}
                                    onChange={handleChange}
                                    variant="outlined"/>
                    </Box>
                </>
                :
                <>
                    <div>You have no appointments scheduled you can schedule the appointment by accessing
                        the estate
                        details - appointments
                    </div>
                    <Button fullWidth
                            sx={{
                                background: "white",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                width: '100%',
                                borderRadius: 2,

                            }} onClick={() => navigate("/")}>View all estates</Button>
                </>
            }
        </div>
    )
}

export default AllUsersAppointments;