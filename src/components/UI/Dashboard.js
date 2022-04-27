import React, { useState, useMemo } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { isBrowser, isMobile } from 'react-device-detect';
import Container from "@mui/material/Container";
import { Box, Drawer } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from '../UI/Footer'
import BalancerLogo from './../../resources/logo-dark.svg';
import BalancerLogoLight from './../../resources/logo-light.svg';
import ImpermanentLoss from "../pages/impermanentLoss/ImpermanentLoss";
import PriceImpact from "../pages/priceImpact/PriceImpact";
import NavBar from "./NavBar";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { myStyles } from '../../styles/styles';
import ReactRoundedImage from "react-rounded-image";
import ArbitrumLogo from './../../resources/arbitrum.svg'
import EtherLogo from './../../resources/ethereum.svg'
import PolygonLogo from './../../resources/polygon.svg'
import FantomLogo from './../../resources/fantom-ftm-logo.svg'
import StatusPage from '../pages/Status/StatusPage';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Boost from '../pages/boost/Boost';
import MenuDrawer from './MenuDrawer/MenuDrawer';


const ColorModeContext = React.createContext({ toggleColorMode: () => { } });



export default function Dashboard() {

    //Set up theme cookie
    //const cookies = new Cookies();
    //var storedTheme = 'light';
    //if (cookies.get('storedTheme') !== null && cookies.get('storedTheme') !== undefined ) {
    //    storedTheme = cookies.get('storedTheme');
    //} else {
    //    storedTheme = 'light';
    // }

    //Theme properties set once at dashboard level
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
    const [open, setOpen] = React.useState(false);
    const [networkId, setNetworkId] = useState('ethereum');
    const mainPrimaryColor = (mode === 'dark') ? "#ffffff" : "#111";
    const mainSecondaryColor = "#ffffff";
    const backgroundColor = (mode === 'dark') ? "#091027" : "#fafafa";
    const paperColor = (mode === 'dark') ? "#162031" : "#fff";
    const anchor = 'left';

    //Color mode properties
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

            },
        }),
        [],
    );

    //Drawer logic
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
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
                },
            }),
        [mode, mainPrimaryColor, mainSecondaryColor, backgroundColor, paperColor],
    );


    //Load global Styles
    const classes = myStyles();
    //NetworkId
    const handleNetworkChange = (evt) => {
        setNetworkId(evt.target.value);
    }



    return (
        <StyledEngineProvider injectFirst>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme} >
                <Box
                        sx={{
                            display: 'flexStart',
                            flexDirection: 'column',
                            minHeight: '90vh',
                        }}
                    >
                    <AppBar position="static" color={"secondary"} background="transparent" style={{ margin: -0 }} >
                        <Toolbar className={classes.toolBar}>
                            <Box display="flex" alignItems="center" >

                                <Box>
                                    <img src={(mode === 'dark') ? BalancerLogo : BalancerLogoLight} alt="Balancer Logo" width="30" />
                                </Box>
                                {isBrowser ?
                                    <Box ml={1}>
                                        <Typography variant="h6" className={classes.root} key="appTitle">
                                            Balancer Tools
                                        </Typography>

                                    </Box> : null}
                                <Typography ml={1} variant="caption">Beta</Typography>
                            </Box>
                            {isBrowser ?
                                <Box display="flex" alignItems="center" justifyContent="center" flexGrow={1}>
                                    <Box alignItems="center" justifyContent="center" sx={{ mr: 2 }}>
                                        <NavBar classes={classes} />
                                    </Box>
                                </Box> : null}
                            <Box display="flex" alignItems="center" justifyContent='flex-end' flexGrow={isMobile ? 1 : null}>
                                <FormControl size="small" className={classes.formControl}>
                                    <Select
                                        color="primary"
                                        labelId="networkSelectLabel"
                                        id="chainSelect"
                                        value={networkId}
                                        onChange={handleNetworkChange}
                                        inputProps={{
                                            name: 'chainId',
                                            id: 'chainId-native-simple',
                                        }}
                                    >
                                        <MenuItem value={'ethereum'} key="eth">
                                            <Box display="flex" alignItems="center">
                                                <Box mr={0.5}>
                                                    <ReactRoundedImage
                                                        image={EtherLogo}
                                                        imageWidth="20"
                                                        imageHeight="20"
                                                        roundedSize="0"
                                                    />
                                                </Box>
                                                <Box>
                                                    Ethereum
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value={'polygon'} key="poly">
                                            <Box display="flex" alignItems="center">
                                                <Box mr={0.5}>
                                                    <ReactRoundedImage
                                                        image={PolygonLogo}
                                                        imageWidth="20"
                                                        imageHeight="20"
                                                        roundedSize="0"
                                                    />
                                                </Box>
                                                <Box>
                                                    Polygon
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value={'arbitrum'} key="arb">
                                            <Box display="flex" alignItems="center">
                                                <Box mr={0.5}>
                                                    <ReactRoundedImage
                                                        image={ArbitrumLogo}
                                                        imageWidth="20"
                                                        imageHeight="20"
                                                        roundedSize="0"
                                                    />
                                                </Box>
                                                <Box>
                                                    Arbitrum
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem value={'fantom'} key="ftm">
                                            <Box display="flex" alignItems="center">
                                                <Box mr={0.5}>
                                                    <ReactRoundedImage
                                                        image={FantomLogo}
                                                        imageWidth="20"
                                                        imageHeight="20"
                                                        roundedSize="0"
                                                    />
                                                </Box>
                                                <Box>
                                                    Fantom
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                                </IconButton>
                                {isMobile ?
                                    <IconButton sx={{ ml: 1 }} onClick={handleDrawerOpen} color="inherit">
                                        {theme.palette.mode === 'dark' ? <MenuIcon /> : <MenuIcon />}
                                    </IconButton> : null}
                                <Drawer
                                    anchor={anchor}
                                    open={open}
                                    onClose={handleDrawerClose}
                                >
                                    <MenuDrawer anchor={anchor} toogleDrawer={handleDrawerClose}></MenuDrawer>
                                </Drawer>
                            </Box>
                        </Toolbar>
                    </AppBar>
                    <CssBaseline />

                        <Container className={classes.container}>
                            <Grid item xs="auto" component="span">
                                <Routes>
                                    <Route path="/" element={<Navigate replace to="/boost" />} />
                                    <Route path="boost" element={<Boost classes={classes} darkState={(mode === 'dark') ? true : false} networkId={networkId} />} />
                                    <Route path="impermanentLoss" element={<ImpermanentLoss classes={classes} darkState={(mode === 'dark') ? true : false} networkId={networkId} />} />
                                    <Route path="priceImpact" element={<PriceImpact classes={classes} networkId={networkId} darkState={(mode === 'dark') ? true : false} />} />
                                    <Route path="status" element={<StatusPage classes={classes} />} />
                                    <Route path='/analytics' component={() => {
                                        window.location.href = 'https://balancer-v2-info.web.app/';
                                        return null;
                                    }} />
                                </Routes>
                            </Grid>
                        </Container>
                    </Box>
                    <Box
                        component="footer"
                        sx={{
                            mt: 'auto',
                            minHeight: '10vh',
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[200]
                                    : theme.palette.grey[800],
                        }}
                    >
                        <Container className={classes.container}>
                            <Grid item xs={12} component="span" flex="1">
                                    <Footer className={classes.footer}></Footer>
                            </Grid>
                        </Container>
                    </Box>
                </ThemeProvider>
            </ColorModeContext.Provider>
        </StyledEngineProvider>
    );
};