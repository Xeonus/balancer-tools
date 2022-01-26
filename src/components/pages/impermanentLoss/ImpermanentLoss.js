import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import ILFormField from "./ILFormField";

export default function ImpermanentLoss(props) {
    return (
        <div key={props.networkId}>
            <Grid item xs={12}> <Header>Impermanent Loss Calculator</Header> </Grid>
                <ILFormField darkState = {props.darkState} props={props} networkId={props.networkId}></ILFormField>
        </div>
    );
}