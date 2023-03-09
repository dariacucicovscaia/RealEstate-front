import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    AppBar,
    Box, Card, CardMedia, Checkbox,
    FormControl, FormControlLabel,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    Modal,
    Tab, Tabs,
    TextField
} from "@mui/material";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import EstatesList from "../components/EstatesList";
import {useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import filterIcon from "../assets/icons/filter.svg"
import homeImage from "../assets/homePage.webp";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: PaymentTransactionType;
    value: PaymentTransactionType;
}

enum AcquisitionStatus {
    OPEN,
    ON_HOLD
}

enum PaymentTransactionType {
    SALE,
    RENT,
    LEASE
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function PaymentTransactionTypeIndex(index: PaymentTransactionType) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

function AcquisitionStatusIndex(index: AcquisitionStatus) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
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
    const [openModalTypeOfEstate, setOpenModalTypeOfEstate] = useState(false);
    const [paymentTransactionType, setPaymentTransactionType] = useState<PaymentTransactionType>(PaymentTransactionType.RENT);
    const [acquisitionStatus, setAcquisitionStatus] = useState<AcquisitionStatus>(AcquisitionStatus.OPEN);
    const [filterSubmitted, setFilterSubmitted] = useState(false);

    const [state, setState] = useState({
        MAGAZINE: false,
        RESTAURANT: false,
        CAFE: false,
        HOTEL: false,
        SALON: false,
        OFFICE: false,
    });
    const {MAGAZINE, RESTAURANT, CAFE, HOTEL, SALON, OFFICE} = state;


    const {register, handleSubmit, setValue} = useForm<IEstateSearchFilter>();
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    const handleChange = (event: React.SyntheticEvent, newValue: PaymentTransactionType) => {
        setPaymentTransactionType(newValue);
        setValue('paymentTransactionType', newValue)
    };
    const handleStateOfTypeOfEstateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name)
        console.log(event.target.checked)
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };


    const handleChangeAcquisitionStatus = (event: React.SyntheticEvent, newValue: AcquisitionStatus) => {
        setAcquisitionStatus(newValue);
        setValue('acquisitionStatus', newValue)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleOpenModalForTypeOfEstate = () => {
        setOpenModalTypeOfEstate(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseModalTypesOfEstate = () => {
        console.log(state)

        // @ts-ignore
        const keys = Object.keys(state).filter(k => state[k]);

        console.log(keys)
        setValue('typeOfEstates', keys)
        setOpenModalTypeOfEstate(false);
    };
    const [estateSearchFilter, setEstateSearchFilter] = useState<IEstateSearchFilter>();

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        setEstateSearchFilter(data)
        setFilterSubmitted(true)
        handleClose()

    })
    useEffect(() => {
        setLoaded(true)
    })
    return (
        <div className="container">{
            filterSubmitted ?
                <Box justifyContent={"end"} alignItems={"end"} display={"flex"}>
                    <Button
                        sx={{
                            background: "#F1F1F1",
                            color: "black",
                            fontWeight: "bolder",
                            m: 0.50,
                            marginRight: "15%",
                            borderRadius: '10px',
                            width: '10%'

                        }}
                        onClick={handleClickOpen}
                    >
                        <img src={filterIcon}/>Filter
                    </Button>
                </Box>

                : <Box justifyContent={"center"} alignItems={"center"} display={"flex"} mt="2%">
                    <Card sx={{maxWidth: "100%", maxHeight: "100%", borderRadius: "25px"}}>
                        <Box sx={{position: 'relative'}}>
                            <CardMedia
                                component="img"
                                image={homeImage}
                            />

                            <Typography variant="h5" style={{
                                fontFamily: 'Arial',
                                fontWeight: "bold",
                                position: "absolute",
                                top: "7%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                            }}>
                                Find your perfect home
                            </Typography>

                            <Button
                                sx={{
                                    position: "absolute",
                                    top: "19%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    background: "#F1F1F1",
                                    color: "black",
                                    fontWeight: "bolder",
                                    borderRadius: '10px',
                                    width: '50%',

                                }}
                                onClick={handleClickOpen}
                            >
                                <img src={filterIcon}/>Filter
                            </Button>
                        </Box>
                    </Card>
                </Box>
        }

            <Dialog open={open}
                    onClose={handleClose}
                    maxWidth={false}
            >
                <DialogTitle>Filter Estates</DialogTitle>
                <DialogContent>
                    <FormGroup defaultValue="rounded" sx={{
                        alignItems: "center"
                    }}>
                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>

                            <FormControl>
                                <Box sx={{width: 600}}>
                                    <AppBar position="static">
                                        <Tabs
                                            value={paymentTransactionType}
                                            onChange={handleChange}
                                            sx={{
                                                backgroundColor: "white",
                                            }}
                                            variant="fullWidth"

                                        >
                                            <Tab
                                                label="SALE" {...PaymentTransactionTypeIndex(PaymentTransactionType.SALE)} />
                                            <Tab
                                                label="RENT" {...PaymentTransactionTypeIndex(PaymentTransactionType.RENT)} />
                                            <Tab
                                                label="LEASE" {...PaymentTransactionTypeIndex(PaymentTransactionType.LEASE)} />
                                        </Tabs>
                                    </AppBar>
                                </Box>
                            </FormControl>
                        </Grid>

                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
                            <FormControl>

                                <Box sx={{width: 600}}>
                                    <AppBar position="static">
                                        <Tabs
                                            value={acquisitionStatus}
                                            onChange={handleChangeAcquisitionStatus}
                                            sx={{
                                                backgroundColor: "white",
                                            }}
                                            variant="fullWidth"
                                            aria-label="full width tabs example"

                                        >
                                            <Tab label="OPEN" {...AcquisitionStatusIndex(AcquisitionStatus.OPEN)} />
                                            <Tab
                                                label="ON-HOLD" {...AcquisitionStatusIndex(AcquisitionStatus.ON_HOLD)} />
                                        </Tabs>
                                    </AppBar>
                                </Box>
                            </FormControl>
                        </Grid>


                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
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

                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
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

                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
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
                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
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
                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
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

                        <Grid container spacing={"2px"} sx={{marginTop: 1}}>
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
                            <Button onClick={handleOpenModalForTypeOfEstate}>Choose type of estate</Button>
                            <Modal
                                open={openModalTypeOfEstate}
                                onClose={handleCloseModalTypesOfEstate}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={{
                                    position: 'absolute' as 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 500,
                                    bgcolor: 'white',
                                    borderRadius: '10px',
                                    boxShadow: 24,
                                    p: 4,
                                }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                        Property Type
                                    </Typography>
                                    <FormControlLabel control={
                                        <Checkbox checked={MAGAZINE} onChange={handleStateOfTypeOfEstateChange}
                                                  name={TypeOfEstate.MAGAZINE}/>
                                    } label={TypeOfEstate.MAGAZINE}/>
                                    <FormControlLabel control={
                                        <Checkbox checked={RESTAURANT} onChange={handleStateOfTypeOfEstateChange}
                                                  name={TypeOfEstate.RESTAURANT}/>
                                    } label={TypeOfEstate.RESTAURANT}/>
                                    <FormControlLabel control={
                                        <Checkbox checked={CAFE} onChange={handleStateOfTypeOfEstateChange}
                                                  name={TypeOfEstate.CAFE}/>
                                    } label={TypeOfEstate.CAFE}/>
                                    <FormControlLabel control={
                                        <Checkbox checked={HOTEL} onChange={handleStateOfTypeOfEstateChange}
                                                  name={TypeOfEstate.HOTEL}/>
                                    } label={TypeOfEstate.HOTEL}/>
                                    <FormControlLabel control={
                                        <Checkbox checked={SALON} onChange={handleStateOfTypeOfEstateChange}
                                                  name={TypeOfEstate.SALON}/>
                                    } label={TypeOfEstate.SALON}/>
                                    <FormControlLabel control={
                                        <Checkbox checked={OFFICE} onChange={handleStateOfTypeOfEstateChange}
                                                  name={TypeOfEstate.OFFICE}/>
                                    } label={TypeOfEstate.OFFICE}/>

                                    <Button sx={{
                                        background: "#F1F1F1",
                                        color: "black",
                                        fontWeight: "bolder",
                                        m: 0.50,
                                        width: '25%',
                                        borderRadius: 2
                                    }} onClick={handleCloseModalTypesOfEstate}>choose</Button>
                                </Box>
                            </Modal>
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
                    <Button sx={{
                        background: "#F1F1F1",
                        color: "black",
                        fontWeight: "bolder",
                        m: 0.50,
                        width: '25%',
                        borderRadius: 2
                    }} onClick={onSubmit}>Search</Button>
                </DialogActions>
            </Dialog>
            {estateSearchFilter ?
                <EstatesList estateFilter={estateSearchFilter}
                             key={estateSearchFilter.typeOfEstates + estateSearchFilter.yearOfConstructionFrom}/>

                : <></>
            }
        </div>
    );
}

export default EstateFilterComponent;