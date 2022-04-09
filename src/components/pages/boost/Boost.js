import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import BoostForm from "./BoostForm";
import { Typography } from "@mui/material";

export default function Boost (props) {
    return (
        <div key={props.networkId} >
            <Grid item xs={12}> <Header>veBAL Boost Calculator</Header> </Grid>
            {props.networkId === 'ethereum' ?
            <Grid item xs={12} component="span">
                    <BoostForm darkState = {props.darkState} networkId={props.networkId}></BoostForm>
            </Grid>
            :
            <Typography color="red" >Chain does not support veBAL yet!</Typography>
    }
        </div>
    );
}