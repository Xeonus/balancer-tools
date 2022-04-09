import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import BoostForm from "./BoostForm";

export default function Boost (props) {
    return (
        <div key={props.networkId} >
            <Grid item xs={12}> <Header>veBAL Boost Calculator</Header> </Grid>
            <Grid item xs={12} component="span">
                    <BoostForm darkState = {props.darkState} networkId={props.networkId}></BoostForm>
            </Grid>
        </div>
    );
}