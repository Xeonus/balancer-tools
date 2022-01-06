import React, { useState } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../UI/Footer'
import BgImage from './../../resources/bg-header.svg'
import BalancerLogo from './../../resources/logo-dark.svg';
import BalancerLogoLight from './../../resources/logo-light.svg';
import ImpermanentLoss from "../pages/impermanentLoss/ImpermanentLoss";
import PriceImpact from "../pages/priceImpact/PriceImpact";
import NavBar from "./NavBar";
import LightDarkModeSwitcher from "./LightDarkModeSwitcher";



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
            type: palletType,
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

    //Stlye properties
    const useStyles = makeStyles((theme) => ({
        backDrop: {
            backgroundImage: `url(${BgImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            flexDirection: "column",
            zIndex: 1,
        },
        root: {
            flexGrow: 1,
            spacing: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
        title: {
            flexGrow: 1,
            flexDirection: "row",
            display: "flex",
            margin: "2px",
            justifyContent: 'center',
            textAlign: 'center',
            align: "center",
        },
        titleBox: {
            flexGrow: 1,
            flexDirection: "column",
            display: "flex",
            justifyContent: 'center',
            textAlign: 'center',
            align: "center",
            alignItems: "center",
        },
        container: {
            flexGrow: 1,
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'center',
            spacing: 2,
            //boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 20px 20px 150px #FED533, -20px -20px 150px #EC4899",
        },
        footer: {
            flexGrow: 1,
            spacing: 0,
            position: "absolute",
            bottom: "0",
            textAlign: 'center',
            align: "center",
            justifyContent: 'center',
        },
        paper: {
            '@media only screen and (min-width: 600px)': {
                padding: theme.spacing(1),
            },
            minWidth: 'auto',
            textAlign: 'center',
            align: 'center',
            justifyContent: 'center',
            color: '#272936',
            borderRadius: "22px",
        },
        paperGlow: {
            minWidth: '320px',
            textAlign: 'center',
            align: 'center',
            color: '#272936',
            '@media only screen and (min-width: 600px)': {
                boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 20px 20px 40px #FED533, -20px -20px 40px #EC4899",
                '&:hover': {
                    backgroundPosition: "100% 0",
                    boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 30px 30px 100px #FED533, -30px -30px 60px #EC4899",
                    opacity: "1",
                    transition: "all .2s ease-out",
                },
            },
            boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 20px 20px 80px #FED533, -20px -20px 80px #EC4899",
            '&:hover': {
                backgroundPosition: "100% 0",
                boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.35), 30px 30px 100px #FED533, -30px -30px 100px #EC4899",
                opacity: "1",
                transition: "all .2s ease-out",
            },
            borderRadius: "22px",
            zIndex: 2,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 'auto',
        },
        tabTheme: {
            background: 'linear-gradient(20deg, #1022d7 25%, #6a7cff 95%)',
            maxWidth: 300,
            align: 'center',
            justifyContent: 'center',
            borderRadius: 3,
        },
        rightToolbar: {
            marginLeft: "auto",
            marginRight: -12
        },
        toolBar: {
        },
        navButton: {
            color: "white",
            height: "40px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "600",
            backgroundSize: "200% 100%",
            background: "linear-gradient(90deg,#1022d7,#6a7cff,#00f)",
            boxShadow: "0 4px 15px 0 rgb(224 100 61 / 8%)",
            margin: "0",
            border: "0",
            size: "small",
        }
    }));

    const classes = useStyles();

    //Reset data array
    const handleDarkModeClick = (darkState) => {
        setDarkState(!darkState);
    }



    return (
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




    );
};