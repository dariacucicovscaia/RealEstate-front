import React, {useEffect, useState} from "react";
import IEstate from "../../types/IEstate";
import Page from "../../types/Page";
import EstateCard from "./EstateCard";

const EstatesList: React.FC<{ estates: Page<IEstate>, page : number, pageSize:number }> = ({estates, page, pageSize}) => {

    return (
        <div className="page__cards"
              style={{marginTop:3}}
        >
            {estates?.content.map((estate) => {
                return (<EstateCard estate={estate} key={estate.id}/>)
            })}
        </div>
    )
}
export default EstatesList;