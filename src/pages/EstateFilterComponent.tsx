import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
    AppBar,
    Box,
    Card,
    CardMedia,
    Checkbox,
    createTheme,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    Grid,
    MenuItem,
    Modal,
    Pagination, Select, SelectChangeEvent,
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
import IArticle from "../types/IArticle";
import ArticlesList from "../components/news/ArticlesList";
import NewsService from "../services/news.service";
import {Label} from "@mui/icons-material";

enum AcquisitionStatus {OPEN, ON_HOLD}

enum PaymentTransactionType {SALE, RENT, LEASE}

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
    MAGAZINE = "Magazine",
    RESTAURANT = "Restaurant",
    OFFICE = "Office",

    STUDIO = "Studio",
    PENTHOUSE = "Penthouse",
    CONDO = "Condo",


    CABIN = "Cabin",
    SINGLE_FAMILY = "Single Family",
    TOWNHOUSE = "Townhouse",
    MULTI_FAMILY = "Multi Family",
    RANCH_HOME = "Ranch"
}

function EstateFilterComponent() {
    const [pageA, setPageA] = useState<number>(1);
    const [articles, setArticles] = useState<Page<IArticle>>();
    const [open, setOpen] = useState(false);
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
        ALL: false,
        MAGAZINE: false,
        RESTAURANT: false,
        OFFICE: false,
        STUDIO: false,
        PENTHOUSE: false,
        CONDO: false,
        CABIN: false,
        SINGLE_FAMILY: false,
        TOWNHOUSE: false,
        MULTI_FAMILY: false,
        RANCH_HOME: false,
    });
    const {
        ALL,
        MAGAZINE,
        RESTAURANT,
        OFFICE,
        STUDIO,
        PENTHOUSE,
        CONDO,
        CABIN,
        SINGLE_FAMILY,
        TOWNHOUSE,
        MULTI_FAMILY,
        RANCH_HOME
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
        EstateService.getAllEstatesByAllCriteria(searchFilter, 6, 1).then(res => {
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

    const {register, handleSubmit, setValue} = useForm<IEstateSearchFilter>(
        {
            defaultValues: {
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
        }
    );

    const handleChange = (event: React.SyntheticEvent, newValue: PaymentTransactionType) => {
        setPaymentTransactionType(newValue);
        setValue('paymentTransactionType', newValue)
    };
    const handleStateOfTypeOfEstateChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        console.log(event.target.name)
        console.log(event.target.name === "ALL")
        console.log(event.target.checked)

        if(event.target.name === "ALL"){
            if(event.target.checked){
                setState({
                    ALL: true,
                    MAGAZINE: true,
                    RESTAURANT: true,
                    OFFICE: true,
                    STUDIO: true,
                    PENTHOUSE: true,
                    CONDO: true,
                    CABIN: true,
                    SINGLE_FAMILY: true,
                    TOWNHOUSE: true,
                    MULTI_FAMILY: true,
                    RANCH_HOME: true,
                })
            }else{
                setState({
                    ALL: false,
                    MAGAZINE: false,
                    RESTAURANT: false,
                    OFFICE: false,
                    STUDIO: false,
                    PENTHOUSE: false,
                    CONDO: false,
                    CABIN: false,
                    SINGLE_FAMILY: false,
                    TOWNHOUSE: false,
                    MULTI_FAMILY: false,
                    RANCH_HOME: false,
                })
            }
        }else{
            setState({
                ...state,
                [event.target.name]: event.target.checked,
            });
        }

    };


    const handleChangeAcquisitionStatus = (event: React.SyntheticEvent, newValue: AcquisitionStatus) => {
        setAcquisitionStatus(newValue);
        setValue('acquisitionStatus', newValue)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        setEstateSearchFilter(data)
        setFilterSubmitted(true)
        handleClose()

    })
    useEffect(() => {
        NewsService.getAllArticlesPaginated(pageA, 8).then(
            resp => {
                setArticles(resp.data)
                console.log(resp.data)
            }
        )
    }, [pageA])
    useEffect(() => {
        if (estateSearchFilter)
            EstateService.getAllEstatesByAllCriteria(estateSearchFilter, pageSize, page).then(res => {
                setPageableEstateList(res.data);
            })

    }, [estateSearchFilter, page])


    // useEffect(() => {
    //     console.log("state of all has been changed")
    //
    //     if (state.ALL) {
    //         setState({
    //             ALL: true,
    //             MAGAZINE: true,
    //             RESTAURANT: true,
    //             OFFICE: true,
    //             STUDIO: true,
    //             PENTHOUSE: true,
    //             CONDO: true,
    //             CABIN: true,
    //             SINGLE_FAMILY: true,
    //             TOWNHOUSE: true,
    //             MULTI_FAMILY: true,
    //             RANCH_HOME: true,
    //         })
    //         setValue('typeOfEstates', [])
    //     }
    //
    //
    // }, [setValue, state.ALL])

    const handleCheckAll = () => {


    }

    useEffect(() => {
        state.ALL = false
        console.log(state.ALL)
        // @ts-ignore
        const keys = Object.keys(state).filter(k => state[k]);

        console.log(keys)

        setValue('typeOfEstates', keys)
    }, [state] )


    const priceFrom = register('priceFrom')
    const priceTo = register('priceTo')
    const numberOfRoomsFrom = register('numberOfRoomsFrom')
    const numberOfRoomsTo = register('numberOfRoomsTo')
    const squareMetersFrom = register('squareMetersFrom')
    const squareMetersTo = register('squareMetersTo')
    const garagesFrom = register('numberOfGaragesFrom')
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');
    return (
        <div>
            <Dialog open={open}
                    onClose={handleClose}
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
            >
                <DialogTitle justifyContent="center" alignItems="center" display="flex"><b>Filters</b></DialogTitle>
                <DialogContent>
                    <FormGroup defaultValue="rounded" sx={{
                        margin: "5.5px",
                    }}>
                        <Grid container rowSpacing={"2px"} columnSpacing={"2px"} spacing={1} sx={{
                            alignItems: "center",
                        }}>
                            <Divider/>
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
                        <Divider/>


                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Property type</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}

                            >

                                <Grid item xs={6}>
                                    <FormGroup>


                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={ALL}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="ALL"/>
                                        } label={"All"}/>

                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={MAGAZINE}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="MAGAZINE"/>
                                        } label={TypeOfEstate.MAGAZINE}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={RESTAURANT}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="RESTAURANT"/>
                                        } label={TypeOfEstate.RESTAURANT}/>

                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={OFFICE}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="OFFICE"/>
                                        } label={TypeOfEstate.OFFICE}/>

                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={STUDIO}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="STUDIO"/>
                                        } label={TypeOfEstate.STUDIO}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={PENTHOUSE}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="PENTHOUSE"/>
                                        } label={TypeOfEstate.PENTHOUSE}/>

                                    </FormGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGroup>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={CONDO}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="CONDO"/>
                                        } label={TypeOfEstate.CONDO}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={CABIN}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="CABIN"/>
                                        } label={TypeOfEstate.CABIN}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={SINGLE_FAMILY}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="SINGLE_FAMILY"/>
                                        } label={TypeOfEstate.SINGLE_FAMILY}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={TOWNHOUSE}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="TOWNHOUSE"/>
                                        } label={TypeOfEstate.TOWNHOUSE}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={MULTI_FAMILY}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="MULTI_FAMILY"/>
                                        } label={TypeOfEstate.MULTI_FAMILY}/>
                                        <FormControlLabel control={
                                            <Checkbox size="small" color="default" checked={RANCH_HOME}
                                                      onChange={handleStateOfTypeOfEstateChange}
                                                      name="RANCH_HOME"/>
                                        } label={TypeOfEstate.RANCH_HOME}/>
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider/>


                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Price</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}

                            >
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Min</FormLabel>
                                        <Select defaultValue={0} name={priceFrom.name} onChange={priceFrom.onChange}
                                                onBlur={priceFrom.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="1000">$1,000</MenuItem>
                                            <MenuItem value="50000">$50,000</MenuItem>
                                            <MenuItem value="75000">$75,000</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Max</FormLabel>
                                        <Select defaultValue={0} name={priceTo.name} onChange={priceTo.onChange}
                                                onBlur={priceTo.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="50000">$50,000</MenuItem>
                                            <MenuItem value="75000">$75,000</MenuItem>
                                            <MenuItem value="100000">$100,000</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider/>


                        <Divider/>


                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Bedrooms</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}

                            >

                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Min</FormLabel>
                                        <Select defaultValue={0} name={numberOfRoomsFrom.name}
                                                onChange={numberOfRoomsFrom.onChange} onBlur={numberOfRoomsFrom.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="1">Studio</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Max</FormLabel>
                                        <Select defaultValue={0} name={numberOfRoomsTo.name}
                                                onChange={numberOfRoomsTo.onChange} onBlur={numberOfRoomsTo.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="1">Studio</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider/>


                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Bathrooms</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}
                            >
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Max</FormLabel>
                                        <Select defaultValue={0} name={numberOfRoomsTo.name}
                                                onChange={numberOfRoomsTo.onChange} onBlur={numberOfRoomsTo.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="1">1+</MenuItem>
                                            <MenuItem value="2">2+</MenuItem>
                                            <MenuItem value="3">3+</MenuItem>
                                            <MenuItem value="4">4+</MenuItem>
                                            <MenuItem value="5">5+</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Box>
                        <Divider/>

                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Land size</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}
                            >
                                <Grid item xs={6}>

                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Min</FormLabel>
                                        <Select defaultValue={0} name={squareMetersFrom.name}
                                                onChange={squareMetersFrom.onChange} onBlur={squareMetersFrom.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="100">100 m&#178;</MenuItem>
                                            <MenuItem value="200">200 m&#178;</MenuItem>
                                            <MenuItem value="300">300 m&#178;</MenuItem>
                                            <MenuItem value="400">400 m&#178;</MenuItem>
                                            <MenuItem value="500">500 m&#178;</MenuItem>
                                        </Select>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Max</FormLabel>
                                        <Select defaultValue={0} name={squareMetersTo.name}
                                                onChange={squareMetersTo.onChange} onBlur={squareMetersTo.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="100">100 m&#178;</MenuItem>
                                            <MenuItem value="200">200 m&#178;</MenuItem>
                                            <MenuItem value="300">300 m&#178;</MenuItem>
                                            <MenuItem value="400">400 m&#178;</MenuItem>
                                            <MenuItem value="500">500 m&#178;</MenuItem>
                                            <MenuItem value="600">600 m&#178;</MenuItem>
                                        </Select>

                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider/>


                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Garages</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}
                            >
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <Select defaultValue={0} name={garagesFrom.name}
                                                onChange={garagesFrom.onChange} onBlur={garagesFrom.onBlur}>
                                            <MenuItem value="0"><em>Any</em></MenuItem>
                                            <MenuItem value="1">1+</MenuItem>
                                            <MenuItem value="2">2+</MenuItem>
                                            <MenuItem value="3">3+</MenuItem>
                                            <MenuItem value="4">4+</MenuItem>
                                            <MenuItem value="5">5+</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                            </Grid>
                        </Box>
                        <Divider/>

                        <Box sx={{margin: "20px"}}>
                            <Typography variant="subtitle1" alignItems="left"><b>Location</b></Typography>
                            <Grid container
                                  sx={{
                                      marginTop: "1px",
                                      marginBottom: "1px",
                                      alignItems: "center",
                                  }}
                                  spacing={1}
                            >
                                <Grid item xs={6}>

                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>City</FormLabel>
                                        <TextField {...register('city')} defaultValue={null} id="city" label="Any"
                                                   type="text"/>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl sx={{width: "100%"}}>
                                        <FormLabel>Country</FormLabel>
                                        <TextField {...register('country')} defaultValue={null} id="country"
                                                   label="Any"
                                                   type="text"/>

                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider/>


                        {/*<Grid container rowSpacing={"2px"} columnSpacing={"2px"} spacing={1}>*/}
                        {/*    <FormControl sx={{width: "100%", marginTop: "2px"}}>*/}

                        {/*        <AppBar position="static" sx={{boxShadow: "none"}}>*/}
                        {/*            <Tabs*/}
                        {/*                value={acquisitionStatus}*/}
                        {/*                onChange={handleChangeAcquisitionStatus}*/}
                        {/*                sx={{*/}
                        {/*                    backgroundColor: "white",*/}
                        {/*                }}*/}
                        {/*                variant="fullWidth"*/}
                        {/*                aria-label="full width tabs example"*/}

                        {/*            >*/}
                        {/*                <Tab label="OPEN" {...AcquisitionStatusIndex(AcquisitionStatus.OPEN)} />*/}
                        {/*                <Tab*/}
                        {/*                    label="ON-HOLD" {...AcquisitionStatusIndex(AcquisitionStatus.ON_HOLD)} />*/}
                        {/*            </Tabs>*/}
                        {/*        </AppBar>*/}

                        {/*    </FormControl>*/}
                        {/*</Grid>*/}

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
                                    <EstatesList estates={latestEstates} page={1} pageSize={6}/>
                                </> : <></>
                        }
                        {

                            articles ?
                                <>
                                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                                        <Typography variant="h5" style={{
                                            fontFamily: 'Arial',
                                            fontWeight: "bold",
                                            margin: "10px"
                                        }}>
                                            Recently added articles
                                        </Typography>
                                    </Box>
                                    <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
                                        <ArticlesList articles={articles}></ArticlesList>
                                    </Box>
                                </> : <></>
                        }


                    </>
            }

        </div>
    );
}

export default EstateFilterComponent;