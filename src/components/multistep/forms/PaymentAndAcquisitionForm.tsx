import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useContext, useState} from "react";
import {FormContext} from "../CreateEstateForm";
import * as yup from "yup";
import {Grid, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";

function PaymentAndAcquisitionForm() {
    const PaymentTransactionType = [
        {
            id: 0,
            name: "RENT"
        }, {
            id: 1,
            name: "LEASE"
        }, {
            id: 2,
            name: "SALE"
        },
    ]
    const AcquisitionStatus = [
        {
            id: 0,
            name: "OPEN"
        }, {
            id: 1,
            name: "ON_HOLD"
        }, {
            id: 2,
            name: "SOLD"
        },
    ]
    const stepBack = () => {
        setActiveStepIndex(activeStepIndex - 1);
    }
    // @ts-ignore
    const {activeStepIndex, setActiveStepIndex, formData, setFormData} =
        useContext(FormContext);

    const renderError = (message: string) => (
        <p className="italic text-red-600">{message}</p>
    );

    const ValidationSchema = yup.object().shape({
        // workspaceName: yup.string().required(),
        // workspaceURL: yup.string().url().required(),
    });


    return (
        <Formik
            initialValues={{
                paymentTransactionType: "",
                acquisitionStatus: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
                const data = {...formData, ...values};
                setFormData(data);
                console.log(values)
                setActiveStepIndex(activeStepIndex + 1);
            }}
        >
            {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (

                <Form style={{width: "60%"}}>
                    <div className="flex flex-col items-start mb-2">
                        <TextField fullWidth
                                   select
                                   name="paymentTransactionType"
                                   value={values.paymentTransactionType}
                                   onChange={handleChange}
                                   label="Select payment transaction type"
                        >
                            <MenuItem key={""} value={""}>
                                No Selected // Or Empty
                            </MenuItem>
                            {PaymentTransactionType.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <ErrorMessage name="workspaceName" render={renderError}/>
                    <div className="flex flex-col items-start mb-2">
                        <TextField fullWidth
                                   select
                                   name="acquisitionStatus"
                                   value={values.acquisitionStatus}
                                   onChange={handleChange}
                                   label="Select acquisition status"
                        >
                            <MenuItem key={""} value={""}>
                                Not Selected
                            </MenuItem>
                            {AcquisitionStatus.map((option) => (
                                <MenuItem key={option.id} value={option.name}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <ErrorMessage name="workspaceURL" render={renderError}/>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">
                                    <Button
                                        sx={{
                                            background: "#728c69",
                                            color: "white",
                                            fontWeight: "bolder",
                                            borderRadius: 2,
                                            width: "100%"
                                        }}
                                        onClick={stepBack}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">
                                    <Button
                                        sx={{
                                            background: "#728c69",
                                            color: "white",
                                            fontWeight: "bolder",
                                            borderRadius: 2,
                                            width: "100%"
                                        }}
                                        type="submit"
                                    >
                                        Continue
                                    </Button>
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default PaymentAndAcquisitionForm;