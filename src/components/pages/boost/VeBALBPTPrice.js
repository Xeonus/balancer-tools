import React from "react";
import { Box, Typography } from '@mui/material';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import Paper from '@mui/material/Paper';
import { myStyles } from '../../../styles/styles';
import BPTHelper from "./BPTHelper";


export default function VeBALBPTPrice(props) {

    const classes = myStyles();

    //TODO: 
    //1. query TVL and total shares from mainnet and calculate 80/20 BPT share, then display it after loading. 
    //2. Add this component to the BoostForm component


    return (
            <div>
            <Box mb={0.5} display="flex" alignItems="center" justifyContent="center" flexDirection={"column"}>
            <Paper className={classes.paper} variant="outlined" square>
            <Box className={classes.root}>
                <Typography variant={"h7"}>
                    1 veBAL = {<DynamicValueFormatter value={Number(props.bptPrice).toFixed(3)} name={'veBALPrice'} decimals={3} />} $* = {<DynamicValueFormatter value={Number(props.balSpotPrice).toFixed(3)} name={'balPerVeBAL'} decimals={3}/>} BAL* = {<DynamicValueFormatter value={Number(props.wethSpotPrice).toFixed(3)} name={'balPerVeBAL'} decimals={3}/>} WETH*
                </Typography>
                {BPTHelper()}
                </Box>
                </Paper>
                <Typography variant="caption">* Approximation </Typography>
            </Box>
            </div>
    );
}