import React from "react";
import Header from "../../UI/Header";
import Grid from '@material-ui/core/Grid';
import ILFormField from "./ILFormField";

export default function ImpermanentLoss(props) {
    return (
        <div>
            <Grid item xs={12}> <Header>Impermanent Loss Calculator</Header> </Grid>
                <ILFormField darkState = {props.darkState} props={props}></ILFormField>
        </div>
    );
}