import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";


export default function HerokuStatus(props) {

    const [loading, setLoading] = useState(false);
    const [jsonData, setJsonData] = useState("");

    //Fetch Balancer Front-End Json containing incentives data:
    useEffect(() => {
        const url = "https://status.heroku.com/api/v4/current-status";

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                setJsonData(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [setLoading]);

    
    if (loading) return (
        <div>
            <Grid>
                <Box>
                    <CircularProgress></CircularProgress>
                    <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Loading {props.network.name} Heroku status...</Typography>
                </Box>
            </Grid>
        </div>);
    if (jsonData) {
        (console.log("Heroku Status", jsonData))
        return (
            <div key={"heroku"}>
                <Alert severity="success">
                    <AlertTitle>Heroku: Success</AlertTitle>
                    Heroku Endpoint reachable — <strong>Full-stack apps are a go!</strong>
                </Alert>
            </div>
        );
    } else {
        return (
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                GraphQL Endpoint is down — <strong>check it out!</strong>
            </Alert>
        );

    }
}