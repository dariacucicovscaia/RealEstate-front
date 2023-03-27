import React, {SyntheticEvent, useContext, useEffect, useState} from "react";

import Page from "../types/Page";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import {Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import IEstate from "../types/IEstate";
import EstateService from "../services/estate.service";
import EstatesList from "../components/estate/EstatesList";

function OwnerEstates() {

    const [estates, setEstates] = useState<Page<IEstate>>()
    const authHeader = useAuthHeader();
    const auth = useAuthUser();
    const [page, setPage] = useState<number>(1);
    const pageSize = 5;
    const [loaded, setLoaded] = useState(false);

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
        <div className="container">

            {estates ?
                <div>
                    <EstatesList estates={estates} page={page} pageSize={pageSize}/>
                    <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                        <Pagination sx={{
                            flexGrow: 1,
                            mr: 3,
                            mt: 1,
                        }} size="large" count={getPageNumber()} page={page} onChange={handleChange}
                                    variant="outlined"/>

                    </Box>

                </div>
                :
                <>no data</>}
        </div>
    )
}

export default OwnerEstates;

