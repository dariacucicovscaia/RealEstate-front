import React, {SyntheticEvent, useEffect, useState} from "react";

import AppointmentService from "../services/appointment.service";

import Page from "../types/Page";
import Appointment from "../types/Appointment";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import {Pagination} from "@mui/material";
import LoadingBar from "../components/LoadingBar";
import Box from "@mui/material/Box";

function AllUsersAppointments() {
    const [appointments, setAppointments] = useState<Page<Appointment>>()
    const authHeader = useAuthHeader();
    const [page, setPage] = useState<number>(1);
    const pageSize = 4;
    const [loaded, setLoaded] = useState(false);
    const authUser = useAuthUser();

    const getPageNumber = () => {
        let nrOfPages = 0;
        if (appointments) {
            nrOfPages = Math.ceil(appointments?.totalElements / appointments?.elementsPerPage);
        }
        return nrOfPages;
    }
    // @ts-ignore
    const handleChange = (event, page)=> {
        setPage(page);
    };


    useEffect(() => {
            // @ts-ignore
        AppointmentService.getAppointmentsByUserId(authUser().id, pageSize, page, authHeader()).then(res => {
                setAppointments(res.data)
            })
            console.log(page)
        }, [page, loaded]
    )

    useEffect(() => {
        setLoaded(true)
    })

    return (
        <div>
            {loaded ?
                <div>
                    {Array.isArray(appointments?.content) ?

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
                                appointments?.content.map((result: Appointment) => {
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
                        </table> : <>No elements found</>
                    }
                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{
                        margin : "20px 0px"
                    }}>
                        <Pagination size="large" count={getPageNumber()} page={page} onChange={handleChange}
                                    variant="outlined"/>
                    </Box>
                </div>
                :
                <LoadingBar/>}
        </div>
    )
}

export default AllUsersAppointments;