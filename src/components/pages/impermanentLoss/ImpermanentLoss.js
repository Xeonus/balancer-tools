import React from "react";
import Header from "../../UI/Header";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ILFormField from "./ILFormField";

export default function ImpermanentLoss(props) {
    return (
        <div>
            <Grid item xs={12}> <Header>Impermantent Loss Calculator</Header> </Grid>
                <Paper elevation={3} className={props.classes.paper}>
                    <ILFormField></ILFormField>
                </Paper>
        </div>
    );
}