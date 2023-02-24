import React, {ChangeEvent, useEffect, useState} from "react";
import UserService from "../services/user.service";
import User from "../types/User";
import {TextField, Button} from "@mui/material";

function UserC() {
    const [email, setEmail] = useState<string>();
    const [user, setUser] = useState<User>();
    const onSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const search = () => {
        UserService.getByEmail(email).then(res => {
            setUser(res.data)
        })

        console.log(user)
    }
    useEffect(
        () => {
            console.log(user)
        }, [user]
    )

    return (
        <div>
            <TextField id="standard-basic" label="email" variant="standard" onChange={onSearchInput} />
            <Button variant="contained" onClick={search}>Search</Button>
        </div>
    )
}

export default UserC;