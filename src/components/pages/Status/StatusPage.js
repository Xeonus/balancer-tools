import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";
import { networks } from './../../constants/networkConfigs';
import GraphQLStatus from "./GraphQLStatus";
import HerokuStatus from "./HerokuStatus";
import PageStatus from "./PageStatus";


export default function StatusPage(props) {

    const networkConfigs = networks;




    return (
        <div key={props.networkId}>
            <Grid item> <Header>Balancer Status Dashboard</Header> </Grid>
            {
                networkConfigs.map(config =>
                    <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={config.id}>
                    <GraphQLStatus network={config} />
                    </Box>
                    )
            }
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"heroku"}>
                <HerokuStatus/>
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"mainnetSite"}>
                <PageStatus url={"https://app.balancer.fi/"} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"polygonSite"}>
                <PageStatus url={"https://polygon.balancer.fi/"} />
            </Box>
            <Box p={0.5} display="flex" flexDirection="row" justifyContent="center" key={"arbitrumSite"}>
                <PageStatus url={"https://arbitrum.balancer.fi/"} />
            </Box>
        </div>
    );
}