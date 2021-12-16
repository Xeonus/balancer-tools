export const useStyles = makeStyles((theme) => ({
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