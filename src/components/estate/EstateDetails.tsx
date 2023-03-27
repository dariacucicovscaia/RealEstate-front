import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import EstateService from "../../services/estate.service";
import EstateDTO from "../../types/EstateDTO";
import {
    Alert,
    Dialog,
    DialogContent,
    FormControl,
    FormGroup,
    Grid, IconButton,
    ImageList,
    ImageListItem,
    Modal
} from "@mui/material";
import Box from "@mui/material/Box";
import bedroomIcon from "../../assets/icons/bedroom-icon.svg";
import bathroomIcon from "../../assets/icons/bath-room-icom.svg";
import garageIcon from "../../assets/icons/garage-property-svgrepo-com.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {DateTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import AppointmentService from "../../services/appointment.service";
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import AppointmentDTO from "../../types/AppointmentDTO";
import squareMeters from "../../assets/icons/square.svg"
import UserService from "../../services/user.service";
import DialogTitle from "@mui/material/DialogTitle";
import ReportService from "../../services/report.service";
import CloseIcon from '@mui/icons-material/Close';
import AssessmentIcon from '@mui/icons-material/Assessment';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function EstateDetails() {
    const [open, setOpen] = React.useState(false);
    const [openReportingDialog, setOpenReportingDialog] = React.useState(false);
    const [timeValue, setTimeValue] = React.useState<Dayjs | null>(dayjs(null));
    const {id} = useParams();
    const [estate, setEstate] = useState<EstateDTO>()
    const [appointment, setAppointment] = useState<AppointmentDTO>()
    const authHeader = useAuthHeader();
    const authUser = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [isSeller, setIsSeller] = useState(false);
    const [dateValueStartReportingService, setDateValueStartReportingService] = useState<Dayjs | null>(null);
    const [dateValueEndReportingService, setDateValueEndReportingService] = useState<Dayjs | null>(null);
    const [newReportPath, setNewReportPath] = useState<string>();
    const [newReportPathAlert, setNewReportPathAlert] = useState(false);
    const [newAppointmentAlert, setNewAppointmentAlert] = useState(false);

    const handleOpenReportingDialog = () => setOpenReportingDialog(true);
    const handleCloseReportingDialog = () => setOpenReportingDialog(false);
    const handleNewReportAlertOpen = () => setNewReportPathAlert(true);
    const handleNewReportAlertClose = () => setNewReportPathAlert(false);
    const handleNewAppointmentAlertOpen = () => setNewAppointmentAlert(true);
    const handleNewAppointmentClose = () => setNewAppointmentAlert(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        console.log(timeValue?.format())
        console.log(timeValue?.add(1, "h").format())
    }, [open])

    const makeAppointment = (date: dayjs.Dayjs | null) => {
        // @ts-ignore
        AppointmentService.createAppointment(date, authUser().id, id, authHeader()).then((res) => {
            setAppointment(res.data)
        })
        setOpen(false)
        handleNewAppointmentAlertOpen()
    }
    const generateReport = (startDateTime: dayjs.Dayjs | null, endDateTime: dayjs.Dayjs | null) => {
        // @ts-ignore
        ReportService.generateReport(startDateTime, endDateTime, id, authHeader()).then((res) => {
                setNewReportPath(res.data.slice(res.data.lastIndexOf("\\") + 1))
            }
        )
        setOpenReportingDialog(false)
        handleNewReportAlertOpen()
    }

    useEffect(() => {
        // @ts-ignore
        EstateService.getAllEstateDetails(id).then(res => {
                setEstate(res.data)
            }
        )
        // @ts-ignore
        UserService.getOwnerOfAnEstate(id).then(res => {
            console.log(res.data.id === authUser()?.id)
            setIsSeller(res.data.id === authUser()?.id)
        })
    }, [id])

    useEffect(() => {
        console.log(dateValueStartReportingService)
    }, [dateValueStartReportingService])

    return (
        <div className="container">
            <Dialog open={openReportingDialog}
                    onClose={handleCloseReportingDialog}
                    maxWidth={false}
            >
                <DialogTitle>Reporting</DialogTitle>
                <DialogContent>
                    <FormGroup defaultValue="rounded" sx={{
                        alignItems: "center"
                    }}>
                        <Grid container rowSpacing={"2px"} columnSpacing={"2px"}>

                            <FormControl sx={{width: "100%"}}>

                                <h4>Pick a start time for the report</h4>
                                <DateTimePicker sx={{width: "100%"}} value={dateValueStartReportingService}
                                                onChange={(newStartDate) => setDateValueStartReportingService(newStartDate)}/>

                                <h4>Pick an end time for the report</h4>
                                <DateTimePicker sx={{width: "100%"}} value={dateValueEndReportingService}
                                                onChange={(newEndDate) => setDateValueEndReportingService(newEndDate)}/>
                                <Button sx={{
                                    background: "#F1F1F1",
                                    color: "black",
                                    fontWeight: "bolder",
                                    m: 0.50,
                                    width: '25%',
                                    borderRadius: 2
                                }}
                                        onClick={() => generateReport(dateValueStartReportingService, dateValueEndReportingService)}>submit</Button>
                            </FormControl>
                        </Grid>
                    </FormGroup>
                </DialogContent>
            </Dialog>
            {newReportPathAlert ? <>
                    <Alert severity="info" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={
                                handleNewReportAlertClose
                            }
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }>New report has been generated filename: <strong>{newReportPath}</strong></Alert>
                </>
                : <></>
            }
            {newAppointmentAlert ? <>
                    <Alert severity="info" action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={
                                handleNewAppointmentClose
                            }
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }>New appointment has been created see all appointments <a href="/myAppointments">here</a></Alert>
                </>
                : <></>
            }
            <Grid container spacing={2} mt={2}>
                <Grid item xs={6} md={4}>
                    <h3><b>{estate?.fullAddress}</b></h3>
                    <b>{estate?.city}, {estate?.country}</b>
                </Grid>
                <Grid item xs={6} md={8}>
                    <ImageList sx={{width: "100%", height: 200}} cols={4} rowHeight={164}>
                        {estate?.estatePhotos.map((photo: string) => {
                            if (photo) return (
                                <ImageListItem key={photo}>
                                    <img className="img-fluid" src={photo}/>
                                </ImageListItem>
                            )
                            else return (<img className="img-fluid" src="/estate/noEstate.png"/>)
                        })}
                        <></>
                    </ImageList>
                </Grid>
                <Grid item xs={6} md={4}>
                    <div className="d-flex">
                        <img src={bedroomIcon}/>
                        <div style={{margin: "5%"}}>{estate?.numberOfRooms}</div>
                        <img src={bathroomIcon}/>
                        <div style={{margin: "5%"}}>{estate?.numberOfBathRooms}</div>
                        <img src={squareMeters}/>
                        <div style={{margin: "5%"}}>{estate?.squareMeters}m&#178;</div>
                        {
                            (estate?.numberOfGarages !== 0) ?
                                <><img src={garageIcon}/>
                                    <div style={{margin: "5%"}}> {estate?.numberOfGarages}</div>
                                </>
                                : <></>
                        }
                        <div style={{margin: "5%"}}>|</div>
                        <div style={{margin: "5%"}}>{estate?.typeOfEstate}</div>
                    </div>
                </Grid>


            </Grid>
            <Box justifyContent={"right"} alignItems={"right"} display={"flex"} sx={{
                margin: "20px 0px"
            }}>
                <Button onClick={handleOpen}
                        sx={{
                            background: "#F1F1F1",
                            color: "black",
                            fontWeight: "bolder",
                            m: 0.50,
                            width: '25%',
                            borderRadius: 2
                        }}>
                    Make appointment
                </Button>
                {
                    isAuthenticated() ? <>
                            <Modal
                                open={open}
                                onClose={handleClose}

                            >
                                <Box sx={{...style, width: "37%"}}>
                                    <Typography id="modal-modal-title" variant="h6" component="h3">
                                        Pick a date and time for your appointment
                                    </Typography>
                                    <DateTimePicker sx={{width: "100%"}}
                                                    value={timeValue}
                                                    onChange={(newTimeValue) => setTimeValue(newTimeValue)}/>

                                    <Button sx={{
                                        background: "#F1F1F1",
                                        color: "black",
                                        fontWeight: "bolder",
                                        m: 0.50,
                                        width: '25%',
                                        borderRadius: 2
                                    }} onClick={() => makeAppointment(timeValue)}>submit</Button>
                                </Box>
                            </Modal>
                            {
                                isSeller ?
                                    <Button
                                        sx={{
                                            background: "#F1F1F1",
                                            color: "black",
                                            fontWeight: "bolder",
                                            mt: 0.50,
                                            borderRadius: '10px',
                                            width: '26.5%'
                                        }}
                                        onClick={handleOpenReportingDialog}
                                    >
                                        <AssessmentIcon/>Reporting
                                    </Button>
                                    : <></>

                            }
                        </>
                        : <Modal open={open}
                                 onClose={handleClose}>
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h3">
                                    You must be authenticated to make an appointment
                                </Typography>

                                <Button onClick={() => navigate("/login")}>login</Button>
                            </Box>
                        </Modal>
                }

            </Box>
        </div>
    )
}

export default EstateDetails;