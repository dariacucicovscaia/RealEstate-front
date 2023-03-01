import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl, FormGroup, Input, InputLabel} from "@mui/material";
import {useForm} from "react-hook-form";
import {useState} from "react";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import IEstate from "../types/IEstate";
import { useAuthUser} from "react-auth-kit";



function EstateComponent() {
    const [open, setOpen] = useState(false);
    const authUser = useAuthUser();
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {register, handleSubmit} = useForm<IEstateSearchFilter>();
    const [estates, setEstates] = useState<IEstate[]>();

    const onSubmit = handleSubmit((data) => {
        console.log(authUser.arguments)
       console.log(data)
        // EstateService.getAllEstatesByAllCriteria(data, 10, 1).then(res => {
        //
        // })
    })
    const click =()=> {
        console.log(authUser())
    }


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Filter Estates</DialogTitle>
                <DialogContent>
                    <FormGroup onSubmit={onSubmit} defaultValue="rounded" sx={{

                        alignItems: "center"
                    }}>

                        <FormControl>
                            <InputLabel htmlFor="paymentTransactionType">paymentTransactionType</InputLabel>
                            <Input  {...register('paymentTransactionType')} id="paymentTransactionType"
                                    name="paymentTransactionType" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="acquisitionStatus">acquisitionStatus</InputLabel>
                            <Input {...register('acquisitionStatus')} id="acquisitionStatus" name="acquisitionStatus"
                                   type="acquisitionStatus"/>
                        </FormControl>


                        <FormControl>
                            <InputLabel htmlFor="squareMetersFrom">squareMetersFrom</InputLabel>
                            <Input {...register('squareMetersFrom')} id="squareMetersFrom" name="squareMetersFrom"
                                   type="squareMetersFrom"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="squareMetersTo">squareMetersTo</InputLabel>
                            <Input {...register('squareMetersTo')} id="squareMetersTo" name="squareMetersTo"
                                   type="text"/>
                        </FormControl>


                        <FormControl>
                            <InputLabel htmlFor="numberOfRoomsFrom">numberOfRoomsFrom</InputLabel>
                            <Input {...register('numberOfRoomsFrom')} id="numberOfRoomsFrom" name="numberOfRoomsFrom"
                                   type="text"/>
                        </FormControl> <FormControl>
                        <InputLabel htmlFor="numberOfRoomsFrom">numberOfRoomsFrom</InputLabel>
                        <Input {...register('numberOfRoomsFrom')} id="numberOfRoomsFrom" name="numberOfRoomsFrom"
                               type="text"/>
                    </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="numberOfRoomsTo">numberOfRoomsTo</InputLabel>
                            <Input {...register('numberOfRoomsTo')} id="numberOfRoomsTo" name="numberOfRoomsTo"
                                   type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="numberOfBathroomsFrom">numberOfBathroomsFrom</InputLabel>
                            <Input {...register('numberOfBathroomsFrom')} id="numberOfBathroomsFrom"
                                   name="numberOfBathroomsFrom" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="numberOfBathroomsTo">numberOfBathroomsTo</InputLabel>
                            <Input {...register('numberOfBathroomsTo')} id="numberOfBathroomsTo"
                                   name="numberOfBathroomsTo" type="text"/>
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="numberOfGaragesFrom">numberOfGaragesFrom</InputLabel>
                            <Input {...register('numberOfGaragesFrom')} id="numberOfGaragesFrom"
                                   name="numberOfGaragesFrom" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="numberOfGaragesFrom">numberOfBathroomsTo</InputLabel>
                            <Input {...register('numberOfGaragesFrom')} id="numberOfGaragesFrom"
                                   name="numberOfGaragesFrom" type="text"/>
                        </FormControl>


                        <FormControl>
                            <InputLabel htmlFor="yearOfConstructionFrom">yearOfConstructionFrom</InputLabel>
                            <Input {...register('yearOfConstructionFrom')} id="yearOfConstructionFrom"
                                   name="yearOfConstructionFrom" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="yearOfConstructionTo">numberOfBathroomsTo</InputLabel>
                            <Input {...register('yearOfConstructionTo')} id="yearOfConstructionTo"
                                   name="yearOfConstructionTo" type="text"/>
                        </FormControl>


                        <FormControl>
                            <InputLabel htmlFor="typeOfEstate">typeOfEstate</InputLabel>
                            <Input {...register('typeOfEstate')} id="typeOfEstate" name="typeOfEstate" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <Input {...register('city')} id="city" name="city" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <Input {...register('country')} id="country" name="country" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="priceFrom">priceFrom</InputLabel>
                            <Input {...register('priceFrom')} id="priceFrom" name="priceFrom" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="priceTo">priceTo</InputLabel>
                            <Input {...register('priceTo')} id="priceTo" name="priceTo" type="text"/>
                        </FormControl>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Search</Button>
                </DialogActions>
            </Dialog>
            <button onClick={click}>cc</button>
        </div>
    );
}

export default EstateComponent;