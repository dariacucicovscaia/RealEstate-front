import React, {createContext, useEffect, useState} from "react";
import {Box, Grid, Step, StepButton, Stepper} from "@mui/material";
import StepConnector from '@mui/material/StepConnector';
import Typography from "@mui/material/Typography";
import MyStep from "./step/Step";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import EstateService from "../../services/estate.service";

import CloseIcon from '@mui/icons-material/Close';
import {routes} from "../../config/routes";
// @ts-ignore
export const FormContext = createContext();

function CreateEstateForm() {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [files, setFiles] = useState<File[]>()
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [done, setDone] = useState(false);
    const [formData, setFormData] = useState({});
    const tabs = ["Estates Address", "Payment And Acquisition", "Estate Details", "Price", "Upload estate Pictures"];
    const navigate = useNavigate();
    const authHeader = useAuthHeader();
    const user = useAuthUser();


    function handleFileUpload() {
        const data = new FormData();

        if (files) {
            files.forEach((file, i) => {
                data.append(`file${i}`, file, file.name);
            });
            const ownerEmail = user()?.email.substring(0, user()?.email.lastIndexOf("@"))
            data.append("estateOwner", ownerEmail)
            axios.post(routes.STATIC_CONTENT_URL + '/estateUpload', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((response) => {
                    setFormSubmitted(true)
                    console.log(response)
                })
                .catch((e) => console.error(e))
        } else {
            console.log("no files selected")
        }

    }

    // @ts-ignore
    const handleChange = (index) => (e) => {
        setActiveStepIndex(index);
        localStorage.setItem("step", index);

    };
    const handlePrev = () => {
        setActiveStepIndex(activeStepIndex - 1);
        console.log(formData)
    };


    useEffect(() => {
        const email = user()?.email;
        console.log(email)
        setFormData({
            "email": email
        })
    }, [done])
    useEffect(() => {
        if (activeStepIndex === 5) {
            // @ts-ignore
            EstateService.createEstateWithAllDetails(formData, authHeader())
                .then(res => {
                    console.log(res.data)
                })

            setFormSubmitted(true)
        }
    }, [activeStepIndex])

    useEffect(() => {
        if (done) {
            handleFileUpload()
            navigate("/allMyEstates")
        }
    }, [done])

    const handleStep = (step: number) => () => {
        setActiveStepIndex(step);
    };
    return (
        <FormContext.Provider
            value={{
                activeStepIndex,
                setActiveStepIndex,
                formData,
                setFormData,
                setFiles,
                files,
                formSubmitted,
                setFormSubmitted
            }}
        >
            <Typography
                variant="h4"
                gutterBottom
                color="primary"
                style={{padding: "0 8px", marginLeft: "10px", marginTop: "10px"}}
            >
                Register estate
            </Typography>
            <Typography gutterBottom style={{marginLeft: "10px"}}>
                This information will be displayed in the estates for sale
            </Typography>
            <Box sx={{width: '90%', margin: "5%"}}>
                <Stepper activeStep={activeStepIndex} connector={<StepConnector/>}>
                    {tabs.map((label, index) => (
                        <Step key={label}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Grid
                container
                justifyContent="space-between"
                sx={{padding: "16px 16px"}}
            />

            <MyStep/>
            <Dialog open={formSubmitted} sx={{mb: 2}}>
                <Box sx={{
                    justifyContent: "right",
                    alignItems: "right",
                    margin: "10px",
                    display: "flex"
                }}>
                    <CloseIcon onClick={() => setDone(true)}/>
                </Box>
                <DialogContent>
                    Estate was <strong>successfully registered</strong>, close to view all your estates
                </DialogContent>
            </Dialog>
        </FormContext.Provider>
    );
}

export default CreateEstateForm;