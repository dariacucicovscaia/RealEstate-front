import React, {useEffect, useState} from "react";
import IEstate from "../../types/IEstate";
import Page from "../../types/Page";
import EstateCard from "./EstateCard";
import {Box} from "@mui/material";

const EstatesList: React.FC<{ estates: Page<IEstate>, page: number, pageSize: number }> = ({
                                                                                               estates, page, pageSize
                                                                                           }) => {

    return (
        <div>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"} mt="0.5%">
                <div className="row row-cols-1 row-cols-md-2 " style={{width:"90%"}}>
                    {estates?.content.map((estate) => {
                        return (<EstateCard estate={estate} key={estate.id}/>)
                    })}
                </div>
            </Box>
        </div>
    )
}
export default EstatesList;