import {Field, Formik} from "formik";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    Stack,
    TextField
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import UserService from "../../services/user.service";
import AdminPanelFullUser from "../../types/AdminPanelFullUser";
import NewsService from "../../services/news.service";
import IArticle from "../../types/IArticle";

function NewArticleForm() {

    const [loaded, setLoaded] = useState(false)
    const user = useAuthUser();
    const authHeader = useAuthHeader();
    const [userDetails, setUserDetails] = useState<AdminPanelFullUser>()
    const [articleCreated, setCreatedArticle] = useState<IArticle>();
    useEffect(() => {
        setLoaded(false)
        UserService.getUserDetails(user()?.id, authHeader()).then(resp => setUserDetails(resp.data))
        console.log("done")
    }, [loaded])


    return (
        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>

            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                <Formik
                    initialValues={{
                        title: '',
                        description: '',
                        content: '',
                        firstName: userDetails?.firstName,
                        lastName: userDetails?.lastName,
                        externalId: user()?.id,
                        isPublished: false,
                    }}

                    onSubmit={async (values, {setErrors, setStatus}) => {
                        try {
                            values.firstName = userDetails?.firstName
                            values.lastName = userDetails?.lastName
                            console.log(values)

                            // @ts-ignore
                            NewsService.saveArticle(values).then(resp => {
                                setCreatedArticle(resp.data)
                            })

                            setLoaded(true);
                            setStatus({success: false});
                        } catch (err) {
                            console.error(err);
                            setStatus({success: false});
                            // @ts-ignore
                            setErrors({submit: err.message});
                        }
                    }}
                >
                    {({errors, handleBlur, handleChange, handleSubmit, touched, values}) => (
                        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="title-newArticle"
                                        type="title"
                                        value={values.title}
                                        name="title"
                                        label="title"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Article title"
                                        fullWidth
                                        error={Boolean(touched.title && errors.title)}
                                    />
                                    {touched.title && errors.title && (
                                        <FormHelperText error id="helper-text-phoneNumber-signup">
                                            {errors.title}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="description-newArticle"
                                        type="description"
                                        value={values.description}
                                        name="description"
                                        label="description"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Short description for your article"
                                        fullWidth
                                        error={Boolean(touched.description && errors.description)}
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error id="helper-text-phoneNumber-signup">
                                            {errors.description}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <TextField
                                        id="content-newArticle"
                                        type="content"
                                        value={values.content}
                                        name="content"
                                        label="content"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Content for your article"
                                        fullWidth
                                        error={Boolean(touched.content && errors.content)}
                                    />
                                    {touched.content && errors.content && (
                                        <FormHelperText error id="helper-text-content-signup">
                                            {errors.content}
                                        </FormHelperText>
                                    )}
                                </Stack>
                            </Grid>


                            <Grid item xs={12}>
                                <Stack spacing={1}>
                                    <InputLabel>
                                        <Box sx={{
                                            justifyContent: "left", alignItems: "left",
                                            display: "flex"
                                        }}>
                                            <Box sx={{marginRight: "3px"}}><Field type="checkbox"
                                                                                  name="isPublished"/></Box>Publish
                                        </Box>
                                    </InputLabel>

                                </Stack>
                            </Grid>


                            <Button type="submit">Submit</Button>
                        </form>
                    )}
                </Formik>
            </Box>

        </Box>

    )
}

export default NewArticleForm