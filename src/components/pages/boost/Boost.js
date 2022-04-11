import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import BoostForm from "./BoostForm";
import { Typography } from "@mui/material";
import VeBalLogo from './../../../resources/veBAL.png'

export default function Boost(props) {
    return (
        <div key={props.networkId} >
            <Grid item xs={12}> 
            <Header>veBAL Boost Calculator</Header>
                <Box >
                    <img src={VeBalLogo} alt="veBAL Logo" width="150" />
                </Box>
            </Grid>
            <Grid item xs={12}>
            </Grid>
            {props.networkId === 'ethereum' ?
                <Grid item xs={12} justifyContent="center">
                    <BoostForm darkState={props.darkState} networkId={props.networkId}></BoostForm>
                </Grid>
                :
                <Typography color="red" >Chain does not support veBAL yet!</Typography>
            }
        </div>
    );
}