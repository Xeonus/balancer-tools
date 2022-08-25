import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import BoostForm from "./BoostForm";
import VeBalLogo from './../../../resources/veBAL.png'
import Alert from '@mui/material/Alert';
import BribeHelper from "./BribeHelper";

export default function Boost(props) {
    return (
        <div key={props.networkId} >
            <Grid item xs={12}>
                <Header>veBAL Boost Calculator</Header>
                <Box >
                    <img src={VeBalLogo} alt="veBAL Logo" width="120" />
                </Box>
            </Grid>
            {props.networkId === 'ethereum' ?
                <Grid item xs={12} justifyContent="center">
                    <BoostForm darkState={props.darkState} networkId={props.networkId}></BoostForm>
                </Grid>
                :
                <Box p={0.5} display="flex" flexDirection="row" justifyContent="center">
                <Alert severity="info">
                    Chain does not support veBAL boosting!
                </Alert>
                </Box>
                
            }
            <BribeHelper networkId={props.networkId}></BribeHelper> 
        </div>
    );
}