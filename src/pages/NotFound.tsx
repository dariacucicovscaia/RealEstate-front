
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import img404 from "../assets/errors.error-404.png"


const NotFound =()=>{
    return ( <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
            <Container maxWidth="md">
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box
                        sx={{
                            mb: 3,
                            textAlign: 'center'
                        }}
                    >
                        <img
                            alt="Under development"
                            src={img404}
                            style={{
                                display: 'inline-block',
                                maxWidth: '100%',
                                width: 400
                            }}
                        />
                    </Box>
                    <Typography
                        align="center"
                        sx={{ mb: 3 }}
                        variant="h3"
                    >
                        404: The page you are looking for isn’t here
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        variant="body1"
                    >
                        You either tried some shady route or you came here by mistake.
                        Whichever it is, try using the navigation
                    </Typography>
                    <Button
                        href="/"
                        sx={{ mt: 3, background:"gray" , color:"white", }}
                    >
                        Go back to main page
                    </Button>
                </Box>
            </Container>
        </Box>
    </>)
}
export default NotFound;