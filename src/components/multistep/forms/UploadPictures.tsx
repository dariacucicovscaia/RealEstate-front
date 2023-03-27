import {Form, Formik} from "formik";
import * as yup from "yup";
import React, {useContext, useState} from "react";
import {FormContext} from "../CreateEstateForm";
import Button from "@mui/material/Button";
import {Grid, Stack} from "@mui/material";


function UploadPictures() {
    // @ts-ignore
    const {activeStepIndex, setActiveStepIndex, formData, setFormData, files, setFiles} = useContext(FormContext);
    const hiddenFileInput = React.useRef(null);
    const [uploadedPictures, setUploadedPictures] = useState<File[]>();

    const handleClick = (event: any) => {
        event.preventDefault();
        // @ts-ignore
        hiddenFileInput.current.click();
    };


    const ValidationSchema = yup.object().shape({});

    const stepBack = () => {
        setActiveStepIndex(activeStepIndex - 1);
    }

    return (
        <Formik
            initialValues={{
                estatePhotos: [],
            }}
            validationSchema={ValidationSchema}
            onSubmit={(values) => {
                const data = {...formData, ...values};
                console.log(files)
                setFormData(data);
                setFiles(uploadedPictures);
                setActiveStepIndex(activeStepIndex + 1);
                console.log(values)
            }}
        >
            {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue}) => (

                <Form style={{width: "60%"}}>

                    <div className="flex flex-col items-start mb-2">

                        <Button
                            fullWidth
                            sx={{
                                background: "white",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                width: '100%',
                                borderRadius: 2
                            }}
                            onClick={handleClick}
                        >
                            Upload picture
                        </Button>

                        <input
                            type="file"
                            ref={hiddenFileInput}
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files as ArrayLike<File>)
                                setUploadedPictures(files);

                                files.map(file => {
                                    // @ts-ignore
                                    values.estatePhotos.push("/estate/"+file.name)
                                })
                            }}
                            style={{display: "none"}}
                        />

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
                                            width: '100%',
                                            borderRadius: 2
                                        }}
                                        type="submit"
                                    >
                                        Submit
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

export default UploadPictures;
