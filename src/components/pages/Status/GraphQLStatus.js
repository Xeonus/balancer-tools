import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getBalancerPoolData } from './../../data/queries/operations';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function GraphQLStatus(props) {

    //Queries
    //Pool Data query Hook (do not encapsulate for state)
    const { loading, error, data } = useQuery(
        getBalancerPoolData,
        {
            context: {
                clientName: props.network.id,
                uri: props.network.graphQLEndPoint,
            },
            fetchPolicy: "no-cache",
        },
    );
    //If data is not fully loaded, display progress
    if (loading) return (
        <div>
            <Grid>
                <Box>
                    <CircularProgress></CircularProgress>
                    <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Loading {props.network.name} Subgraph...</Typography>
                </Box>
            </Grid>
        </div>);
    if (error) return (
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            GraphQL Endpoint is down — <strong>check it out!</strong>
        </Alert>
    );
    return (
        <div key={props.networkId}>
            <Alert severity="success">
                <AlertTitle>GraphQL @ {props.network.name}: Success</AlertTitle>
                GraphQL Endpoint reachable — <strong>all systems a go!</strong>
            </Alert>
        </div>
    );
}