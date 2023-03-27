import React, { useContext } from "react";
import { FormContext } from "../CreateEstateForm";
import AddressForm from "../forms/AddressForm";
import PaymentAndAcquisitionForm from "../forms/PaymentAndAcquisitionForm";
import {Box} from "@mui/material";
import EstateDetailsForm from "../forms/EstateDetailsForm";
import PriceForm from "../forms/PriceForm";
import SomethingWentWrong from "../forms/SomethingWentWrong";
import UploadPictures from "../forms/UploadPictures";

function MyStep( ) {
    // @ts-ignore
    const { activeStepIndex } = useContext(FormContext);
    let stepContent;
    switch (activeStepIndex) {
        case 0:
            stepContent = <AddressForm />;
            break;
        case 1:
            stepContent =  <PaymentAndAcquisitionForm />;
            break;
        case 2:
            stepContent =  <EstateDetailsForm />;
            break;
        case 3:
            stepContent =  <PriceForm />;
            break;
        case 4:
            stepContent = <UploadPictures />;
            break;
        case 5:
            stepContent = <SomethingWentWrong />;
            break;
        default:
            break;
    }

    return (
        <Box justifyContent="center" alignItems="center" display="flex">{stepContent}</Box>
    );
}

export default MyStep;