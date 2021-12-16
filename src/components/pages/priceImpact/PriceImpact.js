import React from "react";
import Header from "../../UI/Header";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PriceImpactFormField from "./PriceImpactFormField";

//TODO: Implementation of price impact page

export default function PriceImpact (props) {
    return (
        <div>
            <Grid item xs={12}> <Header>Price Impact Calculator</Header> </Grid>
            <Grid item xs={12} component="span">
                <Paper elevation={3} className={props.classes.paper}>
                    <PriceImpactFormField></PriceImpactFormField>
                </Paper>
            </Grid>
        </div>
    );
}