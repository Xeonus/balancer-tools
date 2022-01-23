import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import PriceImpactFormField from "./PriceImpactFormField";

//TODO: Implementation of price impact page

export default function PriceImpact (props) {
    return (
        <div key={props.networkId} >
            <Grid item xs={12}> <Header>Price Impact Calculator</Header> </Grid>
            <Grid item xs={12} component="span">
                    <PriceImpactFormField networkId={props.networkId}></PriceImpactFormField>
            </Grid>
        </div>
    );
}