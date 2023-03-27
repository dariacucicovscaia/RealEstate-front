import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import React, {useContext, useState} from "react";
import {FormContext} from "../CreateEstateForm";
import {FormControl, FormHelperText, FormLabel, Grid, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";


function AddressForm() {
    // @ts-ignore
    const {activeStepIndex, setActiveStepIndex, formData, setFormData} = useContext(FormContext);


    const ValidationSchema = yup.object().shape({});
    const renderError = (message: string) => (
        <p className="italic text-red-600">{message}</p>
    );
    const stepBack = () => {
        setActiveStepIndex(activeStepIndex - 1);
    }
    return (
        <Formik
            initialValues={{
                fullAddress: "",
                city: "",
                country: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
                const data = {...formData, ...values};
                setFormData(data);
                setActiveStepIndex(activeStepIndex + 1);
                console.log(values)
            }}
        >
            {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (

                <Form style={{width: "60%"}}>

                    <div className="flex flex-col items-start mb-2">
                        <TextField
                            id="fullAddress-address"
                            type="text"
                            label="Full Address"
                            value={values.fullAddress}
                            name="fullAddress"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="25 str Maria Cebotari"
                            fullWidth
                            error={Boolean(touched.fullAddress && errors.fullAddress)}
                        />
                        {touched.fullAddress && errors.fullAddress && (
                            <FormHelperText error id="helper-text-firstName-signup">
                                {errors.fullAddress}
                            </FormHelperText>
                        )}
                    </div>
                    <ErrorMessage name="name" render={renderError}/>
                    <div className="flex flex-col items-start mb-2">
                        <TextField
                            id="city-address"
                            type="text"
                            label="City"
                            value={values.city}
                            name="city"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Chisinau"
                            fullWidth
                            error={Boolean(touched.city && errors.city)}
                        />
                        {touched.city && errors.city && (
                            <FormHelperText error id="helper-text-firstName-signup">
                                {errors.city}
                            </FormHelperText>
                        )}
                    </div>
                    <ErrorMessage name="name" render={renderError}/>
                    <div className="flex flex-col items-start mb-2">
                        <TextField
                            id="country-address"
                            type="text"
                            label="Country"
                            value={values.country}
                            name="country"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="Moldova"
                            fullWidth
                            error={Boolean(touched.country && errors.country)}
                        />
                        {touched.country && errors.country && (
                            <FormHelperText error id="helper-text-firstName-signup">
                                {errors.country}
                            </FormHelperText>
                        )}
                    </div>

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
                </Form>

            )}
        </Formik>
    )
}

export default AddressForm;
