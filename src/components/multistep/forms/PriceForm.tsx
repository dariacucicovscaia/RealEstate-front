import {ErrorMessage, Field, Form, Formik} from "formik";
import * as yup from "yup";
import React, {useContext, useState} from "react";
import {FormContext} from "../CreateEstateForm";
import {FormControl, FormHelperText, FormLabel, Grid, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";


function PriceForm() {
    // @ts-ignore
    const { activeStepIndex, setActiveStepIndex, formData, setFormData } = useContext(FormContext);


    const ValidationSchema = yup.object().shape({

    });
    const renderError = (message:string) => (
        <p className="italic text-red-600">{message}</p>
    );
    const stepBack = () => {
        setActiveStepIndex(activeStepIndex - 1);
    }

    return (
        <Formik
            initialValues={{
                price: 0,
                currency: "",
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
                const data = { ...formData, ...values };
                setFormData(data);
                setActiveStepIndex(activeStepIndex + 1);

                console.log(values)
            }}
        >
            {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (

                <Form style={{width:"60%"}} >

                    <div className="flex flex-col items-start mb-2">
                        <TextField
                            type="number"
                            label="Estate price"
                            value={values.price}
                            name="price"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="25 str Maria Cebotari"
                            fullWidth
                            error={Boolean(touched.price && errors.price)}
                        />
                        {touched.price && errors.price && (
                            <FormHelperText error id="helper-text-price-signup">
                                {errors.price}
                            </FormHelperText>
                        )}
                    </div>
                    <div className="flex flex-col items-start mb-2">
                        <TextField
                            id="city-address"
                            type="text"
                            label="Price currency"
                            value={values.currency}
                            name="currency"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder="EUR"
                            fullWidth
                            error={Boolean(touched.currency && errors.currency)}
                        />
                        {touched.currency && errors.currency && (
                            <FormHelperText error id="helper-text-currency-signup">
                                {errors.currency}
                            </FormHelperText>
                        )}
                    </div>

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
    )
}

export default PriceForm;
