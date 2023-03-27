import Container from "@mui/material/Container";
import {Box, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {SettingsNotifications} from "../components/SettingsNotifications";

const DynamicAppPropertiesComponent = () => {
    return (<div className="container">
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={"4px"}>
                    <Typography variant="h4">
                        Settings
                    </Typography>

                    <SettingsNotifications/>
                </Stack>
            </Container>
        </Box>
    </div>)
}
export default DynamicAppPropertiesComponent