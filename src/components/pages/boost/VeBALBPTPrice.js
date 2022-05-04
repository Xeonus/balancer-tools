import React from "react";
import { Box, Typography } from '@mui/material';


export default function VeBALBPTPrice(props) {

    //TODO: 
    //1. query TVL and total shares from mainnet and calculate 80/20 BPT share, then display it after loading. 
    //2. Add this component to the BoostForm component


    return (
<div>
            <Box mb={0.5}>
                <Typography variant={isBrowser ? "h4": "h5"}>
                    veBAL price ($) = {<DynamicValueFormatter value={Number(boost).toFixed(3)} name={'veBALPrice'} decimals={3} />}*
                </Typography>
                <Typography variant="caption">* Approximation </Typography>
            </Box>
            </div>
    );
}