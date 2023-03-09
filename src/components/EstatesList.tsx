import React, {useEffect, useState} from "react";
import IEstate from "../types/IEstate";
import Page from "../types/Page";
import EstateCard from "./EstateCard";
import {Pagination} from "@mui/material";
import Box from "@mui/material/Box";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import EstateService from "../services/estate.service";

const EstatesList: React.FC<{ estateFilter: IEstateSearchFilter }> = ({estateFilter}) => {
    const [page, setPage] = useState<number>(1);
    const pageSize = 2;
    const [pageableEstateList, setPageableEstateList] = useState<Page<IEstate>>();
    const [loaded, setLoaded] = useState(false)
    const getPageNumber = () => {
        let nrOfPages = 0;
        if (pageableEstateList) {
            nrOfPages = Math.ceil(pageableEstateList?.totalElements / pageableEstateList?.elementsPerPage);
        }
        return nrOfPages;
    }
    useEffect(() => {
        setLoaded(true)
    })
    // @ts-ignore
    const handleChange = (event, page) => {
        setPage(page);
    };

    useEffect(() => {

            EstateService.getAllEstatesByAllCriteria(estateFilter, pageSize, page).then(res => {
                setPageableEstateList(res.data);
            })


    }, [estateFilter, page, loaded])

    return (
        <div className="page__cards">
            {pageableEstateList?.content.map((estate) => {
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