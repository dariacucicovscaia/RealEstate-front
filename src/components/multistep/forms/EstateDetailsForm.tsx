import {Form, Formik} from "formik";
import React, {useContext} from "react";
import {FormContext} from "../CreateEstateForm";
import * as yup from "yup";
import {FormHelperText, Grid, MenuItem, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";


function EstateDetailsForm() {
    // @ts-ignore
    const {activeStepIndex, setActiveStepIndex, formData, setFormData} =
        useContext(FormContext);

    const renderError = (message: string) => (
        <p className="italic text-red-600">{message}</p>
    );

    const ValidationSchema = yup.object().shape({});
    const TypeOfEstate = [
        {
            id: 0,
            name: "MAGAZINE"
        }, {
            id: 1,
            name: "RESTAURANT"
        }, {
            id: 2,
            name: "CAFE"
        }, {
            id: 3,
            name: "HOTEL"
        }, {
            id: 4,
            name: "SALON"
        }, {
            id: 5,
            name: "OFFICE"
        }, {
            id: 6,
            name: "STUDIO"
        }, {
            id: 7,
            name: "CONDO"
        }, {
            id: 8,
            name: "PENTHOUSE"
        }, {
            id: 9,
            name: "LOFT"
        }, {
            id: 10,
            name: "RAILROAD"
        }, {
            id: 11,
            name: "WING"
        }, {
            id: 12,
            name: "GARDEN"
        }, {
            id: 13,
            name: "BARN"
        }, {
            id: 14,
            name: "BUNGALOW"
        }, {
            id: 15,
            name: "CABIN"
        }, {
            id: 16,
            name: "SINGLE_FAMILY"
        }, {
            id: 17,
            name: "TOWNHOUSE"
        }, {
            id: 18,
            name: "MULTI_FAMILY"
        }, {
            id: 19,
            name: "MODULAR_HOME"
        }, {
            id: 20,
            name: "RANCH_HOME"
        },
    ]
    const stepBack = () => {
        setActiveStepIndex(activeStepIndex - 1);
    }
    return (
        <Formik
            initialValues={{
                squareMeters: 0,
                numberOfRooms: 0,
                numberOfBathRooms: 0,
                numberOfGarages: 0,
                yearOfConstruction: "",
                typeOfEstate: "",
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

                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">

                                    <TextField
                                        name="squareMeters"
                                        type="number"
                                        value={values.squareMeters}
                                        onChange={handleChange}
                                        label="Select square meters"
                                        placeholder="0"
                                        fullWidth
                                        error={Boolean(touched.squareMeters && errors.squareMeters)}
                                    />
                                    {touched.squareMeters && errors.squareMeters && (
                                        <FormHelperText error id="squareMeters">
                                            {errors.squareMeters}
                                        </FormHelperText>
                                    )}
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">

                                    <TextField
                                        name="numberOfRooms"
                                        type="number"
                                        value={values.numberOfRooms}
                                        onChange={handleChange}
                                        label="Number of rooms"
                                        placeholder="0"
                                        fullWidth
                                        error={Boolean(touched.numberOfRooms && errors.numberOfRooms)}
                                    />
                                    {touched.numberOfRooms && errors.numberOfRooms && (
                                        <FormHelperText error id="numberOfRooms">
                                            {errors.numberOfRooms}
                                        </FormHelperText>
                                    )}
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">

                                    <TextField
                                        name="numberOfBathRooms"
                                        type="number"
                                        value={values.numberOfBathRooms}
                                        onChange={handleChange}
                                        label="Select number of bathrooms"
                                        placeholder="0"
                                        fullWidth
                                        error={Boolean(touched.numberOfBathRooms && errors.numberOfBathRooms)}
                                    />
                                    {touched.numberOfBathRooms && errors.numberOfBathRooms && (
                                        <FormHelperText error id="numberOfBathRooms">
                                            {errors.numberOfBathRooms}
                                        </FormHelperText>
                                    )}
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">

                                    <TextField
                                        name="numberOfGarages"
                                        type="number"
                                        value={values.numberOfGarages}
                                        onChange={handleChange}
                                        label="Number of garages"
                                        placeholder="0"
                                        fullWidth
                                        error={Boolean(touched.numberOfGarages && errors.numberOfGarages)}
                                    />
                                    {touched.numberOfGarages && errors.numberOfGarages && (
                                        <FormHelperText error id="numberOfGarages">
                                            {errors.numberOfGarages}
                                        </FormHelperText>
                                    )}
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">
                                    <TextField fullWidth
                                               select
                                               name="typeOfEstate"
                                               value={values.typeOfEstate}
                                               onChange={handleChange}
                                               label="Select type of estate"
                                    >
                                        <MenuItem key={""} value={""}>
                                            Not Selected
                                        </MenuItem>
                                        {TypeOfEstate.map((option) => (
                                            <MenuItem key={option.id} value={option.name}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <div className="flex flex-col items-start mb-2">
                                    <TextField
                                        type="date"
                                        name="yearOfConstruction"
                                        value={values.yearOfConstruction}
                                        onChange={handleChange}
                                        fullWidth
                                        error={Boolean(touched.numberOfGarages && errors.numberOfGarages)}/>
                                    {touched.numberOfGarages && errors.numberOfGarages && (
                                        <FormHelperText error id="numberOfGarages">
                                            {errors.numberOfGarages}
                                        </FormHelperText>
                                    )}
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>


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

export default EstateDetailsForm;