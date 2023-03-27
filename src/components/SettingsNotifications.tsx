import {useEffect, useState} from 'react';
import {
    Alert, Box,
    Card,
    CardActions,
    CardContent,
    CardHeader, Collapse,
    Divider, FormControl,
    FormControlLabel, IconButton, Radio, RadioGroup,
    Stack,
    Unstable_Grid2 as Grid
} from '@mui/material';
import DynamicAppConfigService from "../services/dynamic.app.config.service";
import {useAuthHeader} from "react-auth-kit";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

export const SettingsNotifications = () => {
    const [mailValue, setMailValue] = useState<string>("");
    const [oldMailValue, setOldMailValue] = useState<string>("");

    const [fileSaveValue, setFileSaveValue] = useState<string>("");
    const [oldFileSaveValue, setOldFileSaveValue] = useState<string>("");

    const [loaded, setLoaded] = useState(false);

    const authHeader = useAuthHeader();

    const [openMailChange, setOpenMailChange] = useState(false);
    const [openFileChange, setOpenFileChange] = useState(false);

    const MAIL_CONFIG = "mail";
    const FILE_CONFIG = "fileSettings";

    const handleMailProviderChange = () => {
        DynamicAppConfigService.updateProperties(oldMailValue, mailValue, MAIL_CONFIG, authHeader()).then((res) => {
                setMailValue(res.data.configType)
                setOldMailValue(res.data.configType)
                setOpenMailChange(false)
            }
        )
    }
    const handleFileSaveChange = () => {
        DynamicAppConfigService.updateProperties(oldFileSaveValue, fileSaveValue, FILE_CONFIG, authHeader()).then((res) => {
                console.log(res.data.configType)
                setFileSaveValue(res.data.configType)
                setOldFileSaveValue(res.data.configType)
                setOpenFileChange(false)
            }
        )
    }

    // @ts-ignore
    const handleChangeFileSave = (event, value) => {
        event.preventDefault();
        setFileSaveValue(value)
    }
    // @ts-ignore
    const handleChange = (event, newValue) => {
        event.preventDefault();
        setMailValue(newValue)
    }

    useEffect(() => {
        DynamicAppConfigService.getConfig(MAIL_CONFIG, true, authHeader()).then((res) => {
                setMailValue(res.data.configType)
                setOldMailValue(res.data.configType)
            }
        )
        DynamicAppConfigService.getConfig(FILE_CONFIG, true, authHeader()).then((res) => {
                setFileSaveValue(res.data.configType)
                setOldFileSaveValue(res.data.configType)
            }
        )
    }, [loaded])


    return (
        <>
            <Dialog open={openMailChange} sx={{mb: 2}}>
                <DialogContent>
                    Are you <strong>sure</strong> you want to change the configuration?
                    <Button
                        sx={{
                            background: "#F1F1F1",
                            color: "black",
                            fontWeight: "bolder",
                            m: 0.50,
                            borderRadius: '10px',
                            width: '48%'
                        }}
                        onClick={handleMailProviderChange}
                    >
                        YES
                    </Button>
                    <Button
                        sx={{
                            background: "#F1F1F1",
                            color: "black",
                            fontWeight: "bolder",
                            m: 0.50,
                            borderRadius: '10px',
                            width: '48%'
                        }}
                        onClick={() => setOpenMailChange(false)}
                    >
                        NO
                    </Button>
                </DialogContent>
            </Dialog>

            <Dialog open={openFileChange} sx={{mb: 2}}>
                <DialogContent>
                    Are you <strong>sure</strong> you want to change the configuration?
                    <Button
                        sx={{
                            background: "#F1F1F1",
                            color: "black",
                            fontWeight: "bolder",
                            m: 0.50,
                            borderRadius: '10px',
                            width: '48%'
                        }}
                        onClick={handleFileSaveChange}
                    >
                        YES
                    </Button>
                    <Button
                        sx={{
                            background: "#F1F1F1",
                            color: "black",
                            fontWeight: "bolder",
                            m: 0.50,
                            borderRadius: '10px',
                            width: '48%'
                        }}
                        onClick={() => setOpenFileChange(false)}
                    >
                        NO
                    </Button>
                </DialogContent>

            </Dialog>
            <form>
                <Card>
                    <CardHeader
                        subheader="Manage mail providors"
                        title="Mail sending"
                    />
                    <Divider/>
                    <CardContent>
                        <Grid
                            container
                            spacing={6}
                            wrap="wrap"
                        >
                            <Grid
                                xs={12}
                                sm={6}
                                md={4}
                            >
                                <Stack spacing={1}>
                                    <Stack>

                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions>
                        <FormControl sx={{width: "100%"}}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={mailValue}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="sendgrid" control={<Radio/>} label="Sendgrid"/>
                                <FormControlLabel value="mailgun" control={<Radio/>} label="MailGun"/>
                            </RadioGroup>
                            <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                                <Button sx={{
                                    background: "#F1F1F1",
                                    color: "black",
                                    fontWeight: "bolder",
                                    mt: 0.50,
                                    borderRadius: '10px',
                                    width: '26.5%'

                                }} onClick={() => setOpenMailChange(true)} disabled={oldMailValue === mailValue}>
                                    save
                                </Button>
                            </Box>
                        </FormControl>
                    </CardActions>
                </Card>
            </form>
            <form>

                <Card>
                    <CardHeader
                        subheader="Manage mail providors"
                        title="File saving"
                    />
                    <Divider/>
                    <CardContent>
                        <Grid
                            container
                            spacing={6}
                            wrap="wrap"
                        >
                            <Grid
                                xs={12}
                                sm={6}
                                md={4}
                            >
                                <Stack spacing={1}>
                                    <Stack>

                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>

                    <CardActions>
                        <FormControl sx={{width: "100%"}}>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={fileSaveValue}
                                onChange={handleChangeFileSave}
                            >
                                <FormControlLabel value="drive" control={<Radio/>} label="Drive"/>
                                <FormControlLabel value="local" control={<Radio/>} label="Local"/>
                            </RadioGroup>

                            <Box justifyContent={"right"} alignItems={"right"} display={"flex"}>
                                <Button sx={{
                                    background: "#F1F1F1",
                                    color: "black",
                                    fontWeight: "bolder",
                                    mt: 0.50,
                                    borderRadius: '10px',
                                    width: '26.5%'

                                }} onClick={() => setOpenFileChange(true)}
                                        disabled={oldFileSaveValue === fileSaveValue}>
                                    save
                                </Button>
                            </Box>
                        </FormControl>
                    </CardActions>


                </Card>
            </form>
        </>
    )
        ;
};
