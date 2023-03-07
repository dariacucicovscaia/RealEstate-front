import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormControl,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {useState} from "react";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import {useAuthHeader} from "react-auth-kit";
import EstateService from "../services/estate.service";
import IEstate from "../types/IEstate";
import Page from "../types/Page";
import EstatesList from "../components/EstatesList";
import Home from "./Home";
import {useNavigate} from "react-router-dom";

enum PaymentTransactionType {
    SALE = "SALE", RENT = "RENT", LEASE = "LEASE"
}

enum AcquisitionStatus {
    OPEN = "OPEN", ON_HOLD = "ON_HOLD"
}

enum TypeOfEstate {
    MAGAZINE = "MAGAZINE",
    RESTAURANT = "RESTAURANT",
    CAFE = "CAFE",
    HOTEL = "HOTEL",
    SALON = "SALON",
    OFFICE = "OFFICE",
    STUDIO = "STUDIO",
    PENTHOUSE = "PENTHOUSE",
    LOFT = "LOFT",
    CONDO = "CONDO",
    RAILROAD = "RAILROAD",
    WING = "WING",
    GARDEN = "GARDEN",
    BARN = "BARN",
    BUNGALOW = "BUNGALOW",
    CABIN = "CABIN",
    SINGLE_FAMILY = "SINGLE_FAMILY",
    TOWNHOUSE = "TOWNHOUSE",
    MULTI_FAMILY = "MULTI_FAMILY",
    MODULAR_HOME = "MODULAR_HOME",
    RANCH_HOME = "RANCH_HOME"
}

function EstateFilterComponent() {
    const [open, setOpen] = useState(false);
    const authHeader = useAuthHeader();
    const {register, handleSubmit} = useForm<IEstateSearchFilter>();
    const [estates, setEstates] = useState<Page<IEstate>>();
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        EstateService.getAllEstatesByAllCriteria(data, 10, 1).then(res => {
            setEstates(res.data);
        })
        navigate("/estate")
        handleClose()
    })


    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open filter
            </Button>
            <Dialog fullWidth={true} open={open}
                    onClose={handleClose}>
                <DialogTitle>Filter Estates</DialogTitle>
                <DialogContent>
                    <FormGroup defaultValue="rounded" sx={{
                        alignItems: "center"
                    }}>
                        <Grid container spacing={"50px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <label>PaymentTransactionType</label>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={PaymentTransactionType.RENT}
                                        label="Age"
                                        {...register('paymentTransactionType')}
                                    >
                                        <MenuItem value={PaymentTransactionType.SALE}>sale</MenuItem>
                                        <MenuItem value={PaymentTransactionType.RENT}>rent</MenuItem>
                                        <MenuItem value={PaymentTransactionType.LEASE}>lease</MenuItem>
                                    </Select>
                                    {/*    <FormControlLabel*/}
                                    {/*        control={<Input type="checkbox" {...register('paymentTransactionType')} value={PaymentTransactionType.RENT}/>}*/}
                                    {/*        label={PaymentTransactionType.RENT}*/}
                                    {/*    />*/}
                                    {/*    <FormControlLabel*/}
                                    {/*        control={<Input type="checkbox" {...register('paymentTransactionType')} value={PaymentTransactionType.LEASE}/>}*/}
                                    {/*        label={PaymentTransactionType.LEASE}*/}
                                    {/*    />*/}
                                    {/*    <FormControlLabel*/}
                                    {/*        control={<Input type="checkbox" {...register('paymentTransactionType')}  value={PaymentTransactionType.SALE}/>}*/}
                                    {/*        label={PaymentTransactionType.SALE}*/}
                                    {/*    />*/}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <label>AcquisitionStatus</label>
                                <FormControl>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={AcquisitionStatus.OPEN}
                                        label="Age"
                                        {...register('acquisitionStatus')}
                                    >
                                        <MenuItem value={AcquisitionStatus.OPEN}>open</MenuItem>
                                        <MenuItem value={AcquisitionStatus.ON_HOLD}>on hold</MenuItem>
                                    </Select>
                                    {/*<FormControlLabel*/}
                                    {/*    {...register('acquisitionStatus')}*/}
                                    {/*    control={<Input   type="checkbox" defaultChecked value={AcquisitionStatus.OPEN}/>}*/}
                                    {/*    label={AcquisitionStatus.OPEN}*/}
                                    {/*/>*/}
                                    {/*<FormControlLabel*/}
                                    {/*    {...register('acquisitionStatus')}*/}
                                    {/*    control={<Input   type="checkbox" defaultChecked value={AcquisitionStatus.ON_HOLD}/>}*/}
                                    {/*    label={AcquisitionStatus.ON_HOLD}*/}
                                    {/*/>*/}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={"2px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('squareMetersFrom')} id="squareMetersFrom"
                                               label="squareMetersFrom"
                                               type="squareMetersFrom"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('squareMetersTo')} id="squareMetersTo"
                                               label="squareMetersTo"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={"2px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('numberOfRoomsFrom')} id="numberOfRoomsFrom"
                                               label="numberOfRoomsFrom"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('numberOfRoomsTo')} id="numberOfRoomsTo"
                                               label="numberOfRoomsTo"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={"2px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('numberOfBathroomsFrom')} id="numberOfBathroomsFrom"
                                               label="numberOfBathroomsFrom" type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('numberOfBathroomsTo')} id="numberOfBathroomsTo"
                                               label="numberOfBathroomsTo" type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={"2px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('numberOfGaragesFrom')} id="numberOfGaragesFrom"
                                               label="numberOfGaragesFrom" type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('numberOfGaragesTo')} id="numberOfGaragesTo"
                                               label="numberOfGaragesTo" type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={"2px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('yearOfConstructionFrom')} id="yearOfConstructionFrom"
                                               defaultValue={null}
                                               label="yearOfConstructionFrom" type="text"/>
                                </FormControl></Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('yearOfConstructionTo')} id="yearOfConstructionTo"
                                               defaultValue={null}
                                               label="yearOfConstructionTo" type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={"2px"}>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('priceFrom')} defaultValue={0} id="priceFrom"
                                               label="priceFrom" type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={"auto"}>
                                <FormControl>
                                    <TextField {...register('priceTo')} defaultValue={0} id="priceTo" label="priceTo"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl>
                            <InputLabel htmlFor="typeOfEstate">typeOfEstate</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={TypeOfEstate.OFFICE}
                                label="Age"
                                {...register('typeOfEstate')}
                            >
                                <MenuItem value={TypeOfEstate.BARN}>BARN</MenuItem>
                                <MenuItem value={TypeOfEstate.BUNGALOW}>BUNGALOW</MenuItem>
                                <MenuItem value={TypeOfEstate.RAILROAD}>RAILROAD</MenuItem>
                                <MenuItem value={TypeOfEstate.LOFT}>LOFT</MenuItem>
                                <MenuItem value={TypeOfEstate.OFFICE}>OFFICE</MenuItem>
                            </Select>
                        </FormControl>


                        <FormControl>
                            <InputLabel htmlFor="city">City</InputLabel>
                            <Input {...register('city')} defaultValue={null} id="city" name="city" type="text"/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="country">Country</InputLabel>
                            <Input {...register('country')} defaultValue={null} id="country" name="country"
                                   type="text"/>
                        </FormControl>
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmit} >Search</Button>
                </DialogActions>
            </Dialog>
            {estates ?
                <EstatesList pageableEstateList={estates} key={estates.currentPage}/>
                : <></>
            }
        </div>
    );
}

export default EstateFilterComponent;