import { makeStyles } from '@mui/styles';
import BgImage from './../resources/bg-header.svg'

//Global styles variable
export const myStyles = makeStyles(() => ({
    backDrop: {
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: '16px',
        paddingBottom: '16px',
        flexDirection: "column",
        zIndex: 1,

    },
    root: {
        '& .MuiTextField-root': {
          margin: '8px',
          width: '30ch',
          color: "primary"
        },
        '& .MuiSlider-root': {
          margin: '8px',
          width: '30ch',
          color: "primary"
        },
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
        paddingTop: '8px',
        paddingBottom: '8px',
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
        margin: '8px',
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
    darkTable: {
      alignItems: "center",
      color: '#FFFFFF',
      overflow: 'auto',
    },
      slider: {
        width: 200,
      },
      paperDark: {
        '@media only screen and (min-width: 600px)': {
          padding: '8px',
        },
    
        textAlign: 'center',
        align: 'center',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#35384a',
        borderRadius: "5px",
        margin: '10px'
      },
      paper: {
        '@media only screen and (min-width: 600px)': {
          padding: '8px',
        },
        textAlign: 'center',
        align: 'center',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: "5px",
        margin: '10px',
        minWidth: 'auto',
      },
      resultPaper: {
        '@media only screen and (min-width: 600px)': {
          padding: '8px',
        },
        //maxWidth: '1000px',
        //minWidth: '1000px',
        textAlign: 'center',
        align: 'center',
        justifyContent: 'center',
        color: '#272936',
      },
      form: {
        textAlign: 'center',
        align: 'center',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 10,
        maxWidth: '700px',
        
      },
      button: {
        color: "#fff",
        height: "35px",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "600",
        backgroundSize: "200% 100%",
        transition: "all .2s ease-out",
        background: "linear-gradient(90deg,#00f,#f0f,#00f)",
        '&:hover': {
          backgroundPosition: "100% 0",
          boxShadow: "0 4px 15px 0 rgb(255 100 50 / 0%)",
          transition: "all .2s ease-out",
        },
        boxShadow: "3",
        margin: "0",
        border: "0",
        size: "small",
      },
    navButton: {
        color: "white",
        height: "35px",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "600",
        backgroundSize: "200% 100%",
        background: "linear-gradient(90deg,#1022d7,#6a7cff,#00f)",
        boxShadow: "5",
        margin: "0",
        border: "0",
        size: "small",
    }
}));