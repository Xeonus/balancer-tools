import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { getBalancerPoolData } from './../../data/queries/operations';
import { networks } from './../../constants/networkConfigs';
import GraphQLStatus from "./GraphQLStatus";
import HerokuStatus from "./HerokuStatus";
import PageStatus from "./PageStatus";


export default function StatusPage(props) {

    const networkConfigs = networks;




    return (
        <div key={props.networkId}>
            <Grid item xs={12}> <Header>Balancer Status Dashboard</Header> </Grid>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={networkConfigs[0].id}>
            <GraphQLStatus network={networkConfigs[0]} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={networkConfigs[1].id}>
            <GraphQLStatus network={networkConfigs[1]} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={networkConfigs[2].id}>
            <GraphQLStatus network={networkConfigs[2]} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={networkConfigs[3].id}>
            <GraphQLStatus network={networkConfigs[3]} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"heroku"}>
                <HerokuStatus/>
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"mainnet"}>
                <PageStatus url={"https://app.balancer.fi/"} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"polygon"}>
                <PageStatus url={"https://polygon.balancer.fi/"} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"arbitrum"}>
                <PageStatus url={"https://arbitrum.balancer.fi/"} />
            </Box>
        </div>
    );
}