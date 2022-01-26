import React, { useEffect, useState } from 'react';
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { getBalancerPoolData } from '../../data/queries/operations';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


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