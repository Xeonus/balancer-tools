import React from "react";
import { Box, Typography } from '@mui/material';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';


export default function VeBALBPTPrice(props) {

    //TODO: 
    //1. query TVL and total shares from mainnet and calculate 80/20 BPT share, then display it after loading. 
    //2. Add this component to the BoostForm component


    return (
<div>
            <Box mb={0.5} display="flex" alignItems="center" justifyContent="center" flexDirection={"column"}>
                <Typography variant={"h7"}>
                    1 veBAL = {<DynamicValueFormatter value={Number(props.bptPrice).toFixed(3)} name={'veBALPrice'} decimals={3} />} $*
                </Typography>
                <Typography variant="caption">* Approximation </Typography>
            </Box>
            </div>
    );
}