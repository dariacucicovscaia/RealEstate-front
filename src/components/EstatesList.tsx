import React, {useEffect, useState} from "react";
import IEstate from "../types/IEstate";
import Page from "../types/Page";
import EstateCard from "./EstateCard";
import {Pagination} from "@mui/material";
import Box from "@mui/material/Box";

const EstatesList: React.FC<{ pageableEstateList: Page<IEstate> }> = ({pageableEstateList}) => {
    const [page, setPage] = useState<number>(1);
    const pageSize = 7;

    const getPageNumber = () => {
        let nrOfPages = 0;
        if (pageableEstateList) {
            nrOfPages = Math.ceil(pageableEstateList?.totalElements / pageableEstateList?.elementsPerPage);
        }
        return nrOfPages;
    }
    // @ts-ignore
    const handleChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {
        console.log(pageableEstateList)
    }, [pageableEstateList])

    return (
        <div className="page__cards">
            {pageableEstateList.content.map((estate) => {
                return (<EstateCard estate={estate} key={estate.id}/>)
            })}
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"} sx={{
                margin: "20px 0px"
            }}>
                <Pagination size="large" count={getPageNumber()} page={page} onChange={handleChange}
                            variant="outlined"/>
            </Box>
        </div>
    )
}
export default EstatesList;