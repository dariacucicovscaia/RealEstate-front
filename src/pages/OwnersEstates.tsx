import React, {SyntheticEvent, useContext, useEffect, useState} from "react";

import Page from "../types/Page";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import {Button, Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import IEstate from "../types/IEstate";
import EstateService from "../services/estate.service";
import EstatesList from "../components/estate/EstatesList";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

function OwnerEstates() {

    const [estates, setEstates] = useState<Page<IEstate>>()
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const [page, setPage] = useState<number>(1);
    const pageSize = 5;
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const getPageNumber = () => {
        let nrOfPages = 0;
        if (estates) {
            nrOfPages = Math.ceil(estates?.totalElements / estates?.elementsPerPage);
        }
        return nrOfPages;
    }
    // @ts-ignore
    const handleChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
            EstateService.getOwnersEstates(auth()?.id, page, pageSize, authHeader()).then(res => {
                setEstates(res.data)
            })

            console.log(estates)
            setLoaded(false)
        }, [page, loaded]
    )

    useEffect(() => {
        setLoaded(true)
    })

    return (
        <Box >

            {estates && (estates.content.length >= 1) ?
                <Box>
                    <EstatesList estates={estates} page={page} pageSize={pageSize}/>

                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}  sx={{marginTop:"16px"}}>
                        <Pagination  size="large" count={getPageNumber()} page={page} onChange={handleChange}
                                    variant="outlined"/>

                    </Box>

                </Box>
                :
                <div>

                    <Typography sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }} variant="subtitle1">You dont have any estates put up for registration, you can add one following
                        the link bellow!</Typography>
                    <Box sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                    }}>
                        <Button
                            onClick={()=> navigate("/registerEstate")}
                            sx={{
                                background: "white",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                width: '100%',
                                borderRadius: 2,

                            }}
                        >Register an estate</Button>

                    </Box>
                </div>
            }
        </Box>

    )
}

export default OwnerEstates;

