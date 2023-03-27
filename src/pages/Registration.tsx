import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import UserService from "../services/user.service";
import User from "../types/User";
import {
    FormControl,
    FormHelperText,
    Grid,
    Link,
    Stack,
    TextField
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
// third party
import * as Yup from 'yup';
import {Formik} from 'formik';
import IconButton from "@mui/material/IconButton";

type RegistrationDTO = {
    email: string
    password: string
    firstName: string
    lastName: string
    phoneNumber: string
    fullAddress: string
    city: string
    country: string
}

function Registration() {
    const {register, handleSubmit} = useForm<RegistrationDTO>();
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

    return (
        <>
            <Box justifyContent={"center"} alignItems={"center"} display={"flex"}
                 sx={{margin: "0.05%", outline: "outlined"}}>

                <Grid sx={{width: '45%'}}>
                    <br/>
                    <br/>
                    <Stack>
                        <Typography variant="h4">
                            Register
                        </Typography>
                        <Typography
                            color="text.secondary"
                            variant="body2">
                            Already have an account?
                            &nbsp;
                            <Link
                                href="login"
                                underline="hover"
                                variant="subtitle2"
                                sx={{
                                    color: "#728c69",
                                    fontWeight: "bolder"
                                }}
                            >
                                Log in
                            </Link>
                        </Typography>
                    </Stack>
                    <br/>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            fullAddress: '',
                            city: '',
                            country: ''
                        }}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().max(255).required('First Name is required'),
                            lastName: Yup.string().max(255).required('Last Name is required'),
                            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required'),
                            city: Yup.string().max(255).required('City is required'),
                            fullAddress: Yup.string().max(255).required('Full address is required'),
                            country: Yup.string().max(255).required('Country is required'),

                            phoneNumber:  Yup.string().matches(rePhoneNumber, {message: "Please enter valid number."})

                        })}
                        onSubmit={async (values, {setErrors, setStatus}) => {

                            try {
                                console.log(values)
                                UserService.createUser(values).then(res => {
                                    setUser(res.data)
                                })
                                console.log(user)
                                navigate("/login")

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
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="firstName-login"
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
                                                <FormHelperText error id="helper-text-firstName-signup">
                                                    {errors.firstName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="lastName-signup"
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
                                                <FormHelperText error id="helper-text-lastName-signup">
                                                    {errors.lastName}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
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
                                        <Stack spacing={1}>
                                            <TextField
                                                id="phoneNumber-login"
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
                                                <FormHelperText error id="helper-text-phoneNumber-signup">
                                                    {errors.phoneNumber}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <TextField
                                                id="email-login"
                                                type="email"
                                                value={values.email}
                                                name="email"
                                                label="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder="demo@email.com"
                                                fullWidth
                                                error={Boolean(touched.email && errors.email)}
                                            />
                                            {touched.email && errors.email && (
                                                <FormHelperText error id="helper-text-email-signup">
                                                    {errors.email}
                                                </FormHelperText>
                                            )}
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stack spacing={1}>
                                            <FormControl>  <TextField
                                                id="password-signup"
                                                type='password'
                                                value={values.password}
                                                name="password"
                                                label="password"
                                                onBlur={handleBlur}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                placeholder="******"
                                               fullWidth
                                                error={Boolean(touched.password && errors.password)}
                                            />
                                            {touched.password && errors.password && (
                                                <FormHelperText error id="helper-text-password-signup">
                                                    {errors.password}
                                                </FormHelperText>
                                            )}
                                            </FormControl>
                                        </Stack>

                                        <FormControl fullWidth sx={{mt: 2}}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box sx={{
                                                        bgcolor: "white",
                                                        width: 85,
                                                        height: 8,
                                                        borderRadius: '7px'
                                                    }}/>
                                                </Grid>

                                            </Grid>
                                        </FormControl>
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
                                                width: '25%',
                                                borderRadius: 2
                                            }}>
                                            Create Account
                                        </Button>
                                    </Grid>

                                </Grid>
                            </form>
                        )}
                    </Formik>
                    <br/>

                </Grid></Box>


        </>
    )

}

export default Registration;