import Container from "@material-ui/core/Container";
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../UI/Footer'
import BgImage from './../../resources/bg-header.svg'
import BalancerLogo from './../../resources/logo-dark.svg';
import ILFormField from '../ImpermanentLoss/ILFormField';


   

export default function Dashboard() {

 //Theme properties
 const palletType = "dark";
 const mainPrimaryColor = "#ffffff";
 const mainSecondaryColor = "#272936";
 const backgroundColor = "	#091027";
 const paperColor = "#162031";
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
 }));

 const classes = useStyles();

    return (
        <ThemeProvider theme={theme} >
        <AppBar position="static" color="secondary" style={{ margin: -0 }} >
                    <Toolbar className={classes.toolBar}>
                        <Box display="flex" alignItems="center" sx={{ mr: 2 }} edge="start">
                            <Box p={1}>
                                <img src={BalancerLogo} alt="Balancer Logo" width="30" />
                            </Box>
                            <Box mr={2}>
                                <Typography variant="h6" className={classes.root} key="appTitle">
                                    Balancer Tools
                                </Typography>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            <CssBaseline />
                <Container className={classes.container}  >
                <Grid container className={classes.root} spacing={2} component="span" justify="flex-start" >
                            <Grid item xs={12} component="span"> 
                            <Paper elevation={3} className={classes.paper}>
                            <ILFormField></ILFormField>
                            </Paper>
                            </Grid>
                            <Grid item xs={12} component="span">
                                <Paper elevation={3} className={classes.paper}>
                                    <Footer className={classes.footer}></Footer>
                                </Paper>
                            </Grid>
                        </Grid>
                </Container> 
        </ThemeProvider>




    );
};