import React, {useEffect} from "react";
import {useParams} from "react-router-dom";


function AppointmentController() {
    const {id} = useParams();

    useEffect(() => {

    }, [id])
    return (
        <div >
    </div>
)
}

export default AppointmentController;