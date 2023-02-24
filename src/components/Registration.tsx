import React, {useState} from "react";
import {useForm} from "react-hook-form";
import UserService from "../services/user.service";
import User from "../types/User";
import {FormControl, FormGroup, FormHelperText, Input, InputLabel, Skeleton} from "@mui/material";
import Button from "@mui/material/Button";

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

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        UserService.createUser(data).then(res => {
            setUser(res.data)
        })
    })
    return (
        <FormGroup onSubmit={onSubmit} defaultValue="rounded" sx={{
            display:"flex",
            alignItems:"center"
        }}>

            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input  {...register('email')} id="email" name="email" type="text" />
                {/*<FormHelperText id="email">We'll never share your email.</FormHelperText>*/}
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input {...register('password')} id="password" name="password" type="password"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="firstName">FirstName</InputLabel>
                <Input {...register('firstName')} id="firstName" name="firstName" type="text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="lastName">LastName</InputLabel>
                <Input {...register('lastName')} id="lastName" name="lastName" type="text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="phoneNumber">PhoneNumber</InputLabel>
                <Input {...register('phoneNumber')} id="phoneNumber" name="phoneNumber" type="text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="fullAddress">FullAddress</InputLabel>
                <Input {...register('fullAddress')} id="fullAddress" name="fullAddress" type="text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="city">City</InputLabel>
                <Input {...register('city')} id="city" name="city" type="text"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="country">Country</InputLabel>
                <Input {...register('country')} id="country" name="country" type="text"/>
            </FormControl>
            <Button sx={{
                background:"red",
                color: "white",
                fontWeight: "bolder",
            }}>
                Save
            </Button>
        </FormGroup>
    )

}

export default Registration;