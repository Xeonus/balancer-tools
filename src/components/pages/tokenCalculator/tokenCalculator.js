import React from "react";
import Header from "../../UI/Header";
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import TokenCalculatorForm from "./TokenCalculatorForm";
import VeBalLogo from './../../../resources/veBAL.png'
import Alert from '@mui/material/Alert';

export default function TokenCalculator(props) {
    return (
        <div key={props.networkId} >
            <Grid item xs={12}>
                <Header>veBAL Token Estimator</Header>
                <Box >
                    <img src={VeBalLogo} alt="veBAL Logo" width="120" />
                </Box>
            </Grid>
            {props.networkId === 'ethereum' ?
                <Grid item xs={12} justifyContent="center">
                    <TokenCalculatorForm darkState = {props.darkState} props = {props} networkId = {props.networkId}></TokenCalculatorForm>
                </Grid>
                :
                <Box p={0.5} display="flex" flexDirection="row" justifyContent="center">
                <Alert severity="info">
                    Chain does not support veBAL token!
                </Alert>
                </Box>
                
            }
        </div>
    );
}