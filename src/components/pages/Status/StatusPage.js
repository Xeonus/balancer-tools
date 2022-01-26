import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';

export default function StatusPage(props) {
    return (
        <div key={props.networkId}>
            <Grid item xs={12}> <Header>Balancer Status Dashboard</Header> </Grid>
                
        </div>
    );
}