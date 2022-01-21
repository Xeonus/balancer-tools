import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box, Button, adaptV4Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../UI/Footer'
import BgImage from './../../resources/bg-header.svg'
import BalancerLogo from './../../resources/logo-dark.svg';
import BalancerLogoLight from './../../resources/logo-light.svg';
import ImpermanentLoss from "../pages/impermanentLoss/ImpermanentLoss";
import PriceImpact from "../pages/priceImpact/PriceImpact";
import NavBar from "./NavBar";
import LightDarkModeSwitcher from "./LightDarkModeSwitcher";
import { myStyles } from '../../styles/styles';


export default function Dashboard() {

    //Theme properties set once at dashboard level
    const [darkState, setDarkState] = useState(true);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? "#ffffff" : "#111";
    const mainSecondaryColor = darkState ? "#272936" : "#1a237e";
    const backgroundColor = darkState ? "#091027" : "#fafafa";
    const paperColor = darkState ? "#162031" : "#fff";
    const theme = createTheme({
        palette: {
            mode: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            },
            background: {
                default: backgroundColor,
                paper: paperColor
            },
        },
        typography: {
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'Inter-Variable',
                '-apple-system',
                'BlinkMacSystemFont',
                'Segoe UI',
                'Helvetica',
                'Arial',
                'sans-serif',
                'Apple Color Emoji',
                'Segoe UI Emoji',
            ].join(','),
        },
    });

    //Load global Styles
    const classes = myStyles();

    //Reset data array
    const handleDarkModeClick = (darkState) => {
        setDarkState(!darkState);
    }

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme} >
                <AppBar position="static" color={darkState ? "secondary" : "white"} style={{ margin: -0 }} >
                    <Toolbar className={classes.toolBar}>
                        <Box display="flex" alignItems="center" >
                            <Box p={1}>
                                <img src={darkState ? BalancerLogo : BalancerLogoLight} alt="Balancer Logo" width="30" />
                            </Box>
                            <Box  mb={1}>
                                <Typography variant="h6" className={classes.root} key="appTitle">
                                    Balancer Tools
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>

                            <Box alignItems="center" justifyContent="center" sx={{ mr: 2 }}>
                                <NavBar classes={classes} />
                            </Box>
                        </Box>
                        <Box>
                            <Button
                                onClick={(e) => handleDarkModeClick(darkState)}
                            >
                                <LightDarkModeSwitcher darkState={darkState} />
                            </Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <CssBaseline />
                <Container className={classes.container}  >
                    <Grid item xs="auto" component="span">
                        <Routes>
                            <Route path="/" element={<Navigate replace to="/impermanentLoss" />} />
                            <Route path="impermanentLoss" element={<ImpermanentLoss classes={classes} darkState={darkState} />} />
                            <Route path="priceImpact" element={<PriceImpact classes={classes} />} />
                            <Route path='/analytics' component={() => {
                                window.location.href = 'https://balancer-v2-info.web.app/';
                                return null;
                            }} />
                        </Routes>
                        <Grid item xs={12} component="span">
                            <Box p={1}>
                                <Footer className={classes.footer}></Footer>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};