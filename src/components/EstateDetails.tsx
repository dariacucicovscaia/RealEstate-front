import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import EstateService from "../services/estate.service";
import EstateDTO from "../types/EstateDTO";
import {Grid, ImageList, ImageListItem, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import bedroomIcon from "../assets/icons/bedroom-icon.svg";
import bathroomIcon from "../assets/icons/bath-room-icom.svg";
import garageIcon from "../assets/icons/garage-property-svgrepo-com.svg";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {StaticDateTimePicker} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import AppointmentService from "../services/appointment.service";
import {useAuthHeader, useAuthUser, useIsAuthenticated} from "react-auth-kit";
import AppointmentDTO from "../types/AppointmentDTO";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function EstateDetails() {
    const [open, setOpen] = React.useState(false);
    const [timeValue, setTimeValue] = React.useState<Dayjs | null>(dayjs(null));
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {id} = useParams();
    const [estate, setEstate] = useState<EstateDTO>()
    const [appointment, setAppointment] = useState<AppointmentDTO>()
    const authHeader = useAuthHeader();
    const authUser = useAuthUser();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(timeValue?.format())
        console.log(timeValue?.add(1, "h").format())
    }, [open])

    const makeAppointment = (date: (Dayjs | null)) => {
        // @ts-ignore
        AppointmentService.createAppointment(date, authUser().id, id, authHeader()).then((res) => {
            setAppointment(res.data)
            console.log(res.data)
        })
    }

    useEffect(() => {
        // @ts-ignore
        EstateService.getAllEstateDetails(id).then(res => {
                setEstate(res.data)
            }
        )
    }, [id])
    return (
        <div className="container">
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
                    isAuthenticated() ? <Modal
                            open={open}
                            onClose={handleClose}
                        >
                            <Box sx={style}>
                                <Typography id="modal-modal-title" variant="h6" component="h3">
                                    Pick a date and time for your appointment
                                </Typography>

                                <StaticDateTimePicker
                                    orientation="landscape"
                                    value={timeValue}
                                    onChange={(newTimeValue) => setTimeValue(newTimeValue)}

                                />
                                <Button onClick={() => makeAppointment(timeValue)}>submit</Button>
                            </Box>
                        </Modal>
                        : <Modal  open={open}
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