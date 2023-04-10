import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    AppBar,
    Box,
    Card,
    CardMedia,
    Checkbox,
    createTheme, Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Modal,
    Pagination,
    Tab,
    Tabs,
    TextField,
    ThemeProvider
} from "@mui/material";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import IEstateSearchFilter from "../types/IEstateSearchFilter";
import EstatesList from "../components/estate/EstatesList";
import Typography from "@mui/material/Typography";
import filterIcon from "../assets/icons/filter.svg"
import homeImage from "../assets/main.png";
import EstateService from "../services/estate.service";
import Page from "../types/Page";
import IEstate from "../types/IEstate";

enum AcquisitionStatus {
    OPEN,
    ON_HOLD
}

enum PaymentTransactionType {
    SALE,
    RENT,
    LEASE
}

const theme = createTheme();
theme.typography.h5 = {
    fontSize: '1.0rem',
    '@media (min-width:400px)': {
        fontSize: '1.2rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5rem',
    },
};

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
    const [paymentTransactionType, setPaymentTransactionType] = useState<PaymentTransactionType>(PaymentTransactionType.SALE);
    const [acquisitionStatus, setAcquisitionStatus] = useState<AcquisitionStatus>(AcquisitionStatus.ON_HOLD);
    const [filterSubmitted, setFilterSubmitted] = useState(false);
    const [page, setPage] = useState<number>(1);
    const pageSize = 4;
    const [estateSearchFilter, setEstateSearchFilter] = useState<IEstateSearchFilter>();
    const [pageableEstateList, setPageableEstateList] = useState<Page<IEstate>>();
    const [loaded, setLoaded] = useState(false)
    const [latestEstates, setLatestEstates] = useState<Page<IEstate>>()
    const [state, setState] = useState({
        MAGAZINE: false,
        RESTAURANT: false,
        CAFE: false,
        HOTEL: false,
        SALON: false,
        OFFICE: false,
        STUDIO: false,
        PENTHOUSE: false,
        LOFT: false,
        CONDO: false,
        RAILROAD: false,
        WING: false,
        GARDEN: false,
        BARN: false,
        BUNGALOW: false,
        CABIN: false,
        SINGLE_FAMILY: false,
        TOWNHOUSE: false,
        MULTI_FAMILY: false,
        MODULAR_HOME: false,
        RANCH_HOME: false,
    });
    const {
        MAGAZINE,
        RESTAURANT,
        CAFE,
        HOTEL,
        SALON,
        OFFICE,
        STUDIO,
        PENTHOUSE,
        LOFT,
        CONDO,
        RAILROAD,
        WING,
        GARDEN,
        BARN,
        BUNGALOW,
        CABIN,
        SINGLE_FAMILY,
        TOWNHOUSE,
        MULTI_FAMILY,
        MODULAR_HOME,
        RANCH_HOME,
    } = state;

    useEffect(() => {
        const searchFilter: IEstateSearchFilter = {
            squareMetersFrom: 0,
            squareMetersTo: 0,

            numberOfRoomsFrom: 0,
            numberOfRoomsTo: 0,

            numberOfBathroomsFrom: 0,
            numberOfBathroomsTo: 0,

            numberOfGaragesFrom: 0,
            numberOfGaragesTo: 0,

            yearOfConstructionFrom: "",
            yearOfConstructionTo: "",

            typeOfEstates: [],

            city: "",
            country: "",

            priceFrom: 0,
            priceTo: 0,

            latestAdded: true
        }
        EstateService.getAllEstatesByAllCriteria(searchFilter, 10, 1).then(res => {
            setLatestEstates(res.data);
        })
    }, [loaded])


// @ts-ignore
    const handlePageChange = (event, page) => {
        setPage(page);
    };
    const getPageNumber = () => {
        let nrOfPages = 0;
        if (pageableEstateList) {
            nrOfPages = Math.ceil(pageableEstateList?.totalElements / pageableEstateList?.elementsPerPage);
        }
        return nrOfPages;
    }

    const {register, handleSubmit, setValue} = useForm<IEstateSearchFilter>();

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
    const onSubmit = handleSubmit((data) => {
        console.log(data)
        setEstateSearchFilter(data)
        setFilterSubmitted(true)
        handleClose()

    })


    useEffect(() => {
        if (estateSearchFilter)
            EstateService.getAllEstatesByAllCriteria(estateSearchFilter, pageSize, page).then(res => {
                setPageableEstateList(res.data);
            })

    }, [estateSearchFilter, page])


    return (
        <div>
            <Dialog open={open}
                    onClose={handleClose}
                    maxWidth={false}
            >

                <DialogTitle justifyContent="center" alignItems="center" display="flex"><b>Filters</b></DialogTitle>
                <DialogContent>
                    <FormGroup defaultValue="rounded" sx={{
                        alignItems: "center",
                        margin: "5.5px",

                    }}>
                        <Grid container rowSpacing={"2px"} columnSpacing={"2px"} spacing={1}>

                            <FormControl sx={{width: "100%"}}>

                                <AppBar position="static" sx={{boxShadow: "none"}}>
                                    <Tabs
                                        value={paymentTransactionType}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: "white"
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
                            </FormControl>
                        </Grid>

                        <Grid container rowSpacing={"2px"} columnSpacing={"2px"} spacing={1}>
                            <FormControl sx={{width: "100%", marginTop: "2px"}}>

                                <AppBar position="static" sx={{boxShadow: "none"}}>
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

                            </FormControl>
                        </Grid>

                        <Grid container
                              sx={{
                                  marginTop: "1px",
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('squareMetersFrom')} id="squareMetersFrom"
                                               label="squareMetersFrom"
                                               type="squareMetersFrom"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('squareMetersTo')} id="squareMetersTo"
                                               label="squareMetersTo"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container
                              sx={{
                                  marginTop: "1px",
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('numberOfRoomsFrom')} id="numberOfRoomsFrom"
                                               label="numberOfRoomsFrom"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('numberOfRoomsTo')} id="numberOfRoomsTo"
                                               label="numberOfRoomsTo"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container
                              sx={{
                                  marginTop: "1px",
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('numberOfBathroomsFrom')} id="numberOfBathroomsFrom"
                                               label="numberOfBathroomsFrom" type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('numberOfBathroomsTo')} id="numberOfBathroomsTo"
                                               label="numberOfBathroomsTo" type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container
                              sx={{
                                  marginTop: "1px",
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('numberOfGaragesFrom')} id="numberOfGaragesFrom"
                                               label="numberOfGaragesFrom" type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('numberOfGaragesTo')} id="numberOfGaragesTo"
                                               label="numberOfGaragesTo" type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container
                              sx={{
                                  marginTop: "1px",
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('yearOfConstructionFrom')} id="yearOfConstructionFrom"
                                               defaultValue={null}
                                               label="yearOfConstructionFrom" type="text"/>
                                </FormControl></Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('yearOfConstructionTo')} id="yearOfConstructionTo"
                                               defaultValue={null}
                                               label="yearOfConstructionTo" type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container
                              sx={{
                                  marginTop: "1px",
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('priceFrom')} defaultValue={0} id="priceFrom"
                                               label="priceFrom" type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('priceTo')} defaultValue={0} id="priceTo" label="priceTo"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <FormControl sx={{width: '100%'}}>
                            <Button sx={{
                                background: "#F1F1F1",
                                color: "black",
                                fontWeight: "bolder",
                                m: 0.50,
                                borderRadius: 2
                            }} onClick={handleOpenModalForTypeOfEstate}>Choose type of estate</Button>
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
                                    width: 700,
                                    bgcolor: 'white',
                                    borderRadius: '10px',
                                    boxShadow: 24,
                                    p: 4,
                                }}>
                                    <Typography id="modal-modal-title" variant="h6" component="h2"
                                                justifyContent="center" alignItems="center" display="flex"
                                                marginBottom="10px">
                                        <b>Property Type</b>
                                    </Typography>
                                    <Divider/>
                                    <Grid container
                                          sx={{
                                              marginBottom: "1px",
                                          }}
                                          spacing={12}
                                    >
                                        <Grid item xs={6}>
                                            <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={MAGAZINE}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.MAGAZINE}/>
                                                } label={TypeOfEstate.MAGAZINE}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={RESTAURANT}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.RESTAURANT}/>
                                                } label={TypeOfEstate.RESTAURANT}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={CAFE}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.CAFE}/>
                                                } label={TypeOfEstate.CAFE}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={HOTEL}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.HOTEL}/>
                                                } label={TypeOfEstate.HOTEL}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={SALON}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.SALON}/>
                                                } label={TypeOfEstate.SALON}/>
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormGroup>

                                                <FormControlLabel control={
                                                    <Checkbox checked={SINGLE_FAMILY}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.SINGLE_FAMILY}/>
                                                } label={TypeOfEstate.SINGLE_FAMILY}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={TOWNHOUSE}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.TOWNHOUSE}/>
                                                } label={TypeOfEstate.TOWNHOUSE}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={MULTI_FAMILY}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.MULTI_FAMILY}/>
                                                } label={TypeOfEstate.MULTI_FAMILY}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={MODULAR_HOME}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.MODULAR_HOME}/>
                                                } label={TypeOfEstate.MODULAR_HOME}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={RANCH_HOME}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.RANCH_HOME}/>
                                                } label={TypeOfEstate.RANCH_HOME}/>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                    <Grid container
                                          sx={{
                                              marginBottom: "1px",
                                          }}
                                          spacing={12}
                                    >
                                        <Grid item xs={6}>
                                            <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={RAILROAD}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.RAILROAD}/>
                                                } label={TypeOfEstate.RAILROAD}/>

                                                <FormControlLabel control={
                                                    <Checkbox checked={OFFICE}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.OFFICE}/>
                                                } label={TypeOfEstate.OFFICE}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={STUDIO}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.STUDIO}/>
                                                } label={TypeOfEstate.STUDIO}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={PENTHOUSE}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.PENTHOUSE}/>
                                                } label={TypeOfEstate.PENTHOUSE}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={LOFT} onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.LOFT}/>
                                                } label={TypeOfEstate.LOFT}/>
                                            </FormGroup>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <FormGroup>
                                                <FormControlLabel control={
                                                    <Checkbox checked={CONDO} onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.CONDO}/>
                                                } label={TypeOfEstate.CONDO}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={WING} onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.WING}/>
                                                } label={TypeOfEstate.WING}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={GARDEN}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.GARDEN}/>
                                                } label={TypeOfEstate.GARDEN}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={BARN} onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.BARN}/>
                                                } label={TypeOfEstate.BARN}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={BUNGALOW}
                                                              onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.BUNGALOW}/>
                                                } label={TypeOfEstate.BUNGALOW}/>
                                                <FormControlLabel control={
                                                    <Checkbox checked={CABIN} onChange={handleStateOfTypeOfEstateChange}
                                                              name={TypeOfEstate.CABIN}/>
                                                } label={TypeOfEstate.CABIN}/>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>


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

                        <Grid container
                              sx={{
                                  marginBottom: "1px"
                              }}
                              spacing={1}
                        >
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('city')} defaultValue={null} id="city" label="city"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                    <TextField {...register('country')} defaultValue={null} id="country" label="country"
                                               type="text"/>
                                </FormControl>
                            </Grid>
                        </Grid>


                    </FormGroup>
                </DialogContent>
                <DialogActions>

                    <Button sx={{
                        background: "#F1F1F1",
                        color: "black",
                        fontWeight: "bolder",
                        justifyContent: "right",
                        alignItems: "right",
                        display: "flex",
                        borderRadius: 2
                    }} onClick={onSubmit}>Search</Button>

                </DialogActions>
            </Dialog>
            {pageableEstateList ?
                <EstatesList estates={pageableEstateList}
                             page={page}
                             pageSize={pageSize}
                             key={pageableEstateList.content.length}/>
                : <></>
            }
            {
                filterSubmitted ?
                    <>
                        <Box justifyContent={"right"} alignItems={"right"} display={"flex"} className="container">
                            <Pagination
                                sx={{
                                    flexGrow: 1,
                                    mr: 3,
                                    mt: 1,
                                }} size="medium" count={getPageNumber()} page={page} onChange={handlePageChange}
                                variant="outlined"/>

                            <Button
                                sx={{
                                    background: "#F1F1F1",
                                    color: "black",
                                    fontWeight: "bolder",
                                    mt: 0.50,
                                    borderRadius: '10px',
                                    width: '26.5%'
                                }}
                                onClick={handleClickOpen}
                            >
                                <img src={filterIcon}/>Filter
                            </Button>
                        </Box>
                    </>

                    :
                    <>
                        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                            <Card sx={{
                                // width: "1000px", maxHeight: "667px"
                            }}>


                                <Box sx={{position: 'relative'}}>
                                    <CardMedia
                                        component="img"
                                        image={homeImage}
                                        width="100%"
                                    />
                                    <ThemeProvider theme={theme}>
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
                                    </ThemeProvider>
                                    <Button
                                        sx={{
                                            position: "absolute",
                                            top: "20%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            background: "white",
                                            color: "black",
                                            fontWeight: "bolder",
                                            borderRadius: '20px',
                                            width: '50%',
                                        }}
                                        onClick={handleClickOpen}
                                    >
                                        <img src={filterIcon}/>Filter
                                    </Button>
                                </Box>


                            </Card>
                        </Box>


                        {

                            latestEstates ?
                                <>
                                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                                        <Typography variant="h5" style={{
                                            fontFamily: 'Arial',
                                            fontWeight: "bold",
                                            margin: "10px"
                                        }}>
                                            Recently added estates
                                        </Typography>
                                    </Box>
                                    <EstatesList  estates={latestEstates} page={1} pageSize={10}/>
                                </> : <></>
                        }


                    </>
            }

        </div>
    );
}

export default EstateFilterComponent;