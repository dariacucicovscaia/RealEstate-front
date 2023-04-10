import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider, FormHelperText, Stack,
    TextField,
    Grid
} from '@mui/material';
import Typography from "@mui/material/Typography";
import React from "react";
import {Formik} from 'formik';
import UserService from "../services/user.service";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import Cookies from 'universal-cookie';

const EditProfile = () => {
    const authHeader = useAuthHeader();
    const authUser = useAuthUser();
    const cookies = new Cookies();
    const refresh = () => window.location.reload()

    return (<>
        <Grid sx={{margin: '5%'}}>
            <Stack>
                <Typography variant="h2" sx={{ml: "-1.5%", fontFamily: "Edwardian Script ITC",}}>
                    Edit your profile
                </Typography>
            </Stack>
            <br/>
            <Formik
                initialValues={{
                    firstName: null,
                    lastName: null,
                    fullAddress: null,
                    city: null,
                    country: null,
                    phoneNumber: null,
                    profilePhoto: null
                }}
                onSubmit={async (values, {setErrors, setStatus}) => {
                    try {
                        console.log(values)
                        // @ts-ignore
                        UserService.updateUser(authUser()?.id, values, authHeader()).then(res => {
                            console.log(res.data)
                            cookies.set('userProfileUpdate', res.data);
                        })
                        console.log(cookies.get('userProfileUpdate'))
                        refresh()

                        setStatus({success: false});
                    } catch (err) {
                        console.error(err);
                        setStatus({success: false});
                        // @ts-ignore
                        setErrors({submit: err.message});
                    }
                }}
            >
                {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Card>
                            <CardHeader
                                subheader="The information can be edited"
                                title="Profile"
                            />
                            <CardContent sx={{pt: 0}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="fn-login"
                                                type="text"
                                                label="first name"
                                                value={values.firstName}
                                                name="firstName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="John"
                                                fullWidth
                                                error={Boolean(touched.firstName && errors.firstName)}
                                            />
                                            {touched.firstName && errors.firstName && (
                                                <FormHelperText error id="helper-text-fn-signup">
                                                    {errors.firstName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="ln-signup"
                                                type="text"
                                                label="last name"
                                                value={values.lastName}
                                                name="lastName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Doe"
                                                fullWidth
                                                error={Boolean(touched.lastName && errors.lastName)}
                                            />
                                            {touched.lastName && errors.lastName && (
                                                <FormHelperText error id="helper-text-ln-signup">
                                                    {errors.lastName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="pn-login"
                                                type="phoneNumber"
                                                value={values.phoneNumber}
                                                name="phoneNumber"
                                                label="phone number"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="+37367521148"
                                                fullWidth
                                                error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                            />
                                            {touched.phoneNumber && errors.phoneNumber && (
                                                <FormHelperText error id="helper-text-pn-signup">
                                                    {errors.phoneNumber}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid> <Grid item xs={12} md={4}>
                                    <Stack spacing={1}>
                                        <TextField
                                            id="fullAddress-signup"
                                            value={values.fullAddress}
                                            name="fullAddress"
                                            label="full address"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            placeholder="12 str 31 August 1989"
                                            fullWidth
                                            error={Boolean(touched.fullAddress && errors.fullAddress)}
                                        />
                                        {touched.fullAddress && errors.fullAddress && (
                                            <FormHelperText error id="helper-text-fullAddress-signup">
                                                {errors.fullAddress}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="city-signup"
                                                value={values.city}
                                                name="city"
                                                label="city"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Chisinau"
                                                fullWidth
                                                error={Boolean(touched.city && errors.city)}
                                            />
                                            {touched.city && errors.city && (
                                                <FormHelperText error id="helper-text-city-signup">
                                                    {errors.city}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Stack spacing={1}>
                                            <TextField
                                                fullWidth
                                                error={Boolean(touched.country && errors.country)}
                                                id="country-signup"
                                                value={values.country}
                                                name="country"
                                                label="country"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="Moldova"
                                                inputProps={{}}
                                            />
                                            {touched.country && errors.country && (
                                                <FormHelperText error id="helper-text-country-signup">
                                                    {errors.country}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            type="submit"
                                            sx={{
                                                background: "#728c69",
                                                color: "white",
                                                fontWeight: "bolder",
                                                m: 0.50,
                                                width: '100%',
                                                borderRadius: 2
                                            }}>
                                            Save details
                                        </Button>
                                    </Grid>
                                </Grid>


                            </CardContent>
                            <Divider/>

                        </Card>
                    </form>
                )}
            </Formik>
            <br/>

        </Grid>
    </>)
}
export default EditProfile;