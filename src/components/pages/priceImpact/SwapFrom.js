import * as React from 'react';
import Header from "../../UI/Header";
import Box from '@mui/material/Box';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { myStyles } from '../../../styles/styles';
import { calculatePIFromAssetArray } from '../../../utils/calculatePIFromAssetArray';
import TextField from '@material-ui/core/TextField';
import { getBalancerPoolData } from './../../data/queries/operations';
import getPoolArray from '../../../utils/getPoolArray';

import { useQuery } from "@apollo/client";

//TODO: Implementation of price impact page

export default function SwapForm(props) {
    const assetArray = [...props.assetArray];

    //Init styles    
    const classes = myStyles();

    //States
    const [sellToken, setSellToken] = React.useState(assetArray[0].assetName);
    const [buyToken, setBuyToken] = React.useState('');
    const [SwapFee, setSwapFee] = React.useState(0.25);
    const [sellTokenQuantity, setSellTokenQuantity] = React.useState(1);


    //State change handlers
    const handleSellChange = (event) => {
        setSellToken(event.target.value);
    };
    const handleBuyChange = (event) => {
        setBuyToken(event.target.value);
    };

    //Price impact value state hook
    const [calcPI, setCalcPI] = React.useState(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));

    const handleSellTokenQuantityChange = (event) => {
        setSellTokenQuantity(event.target.value);
        let clonedSellTokenQuantity = event.target.value;
        setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, clonedSellTokenQuantity, buyToken, SwapFee));
    }

    const sellMenuItems = assetArray.map( element =>
        (
            <MenuItem value={element.assetName}>{element.assetName.toString()}</MenuItem>
        ));


    //Pool Data query Hook (do not encapsulate for state)
    const { loading, error, data } = useQuery(
        getBalancerPoolData,
      {
        context: { clientName: 'mainnet'},
        fetchPolicy: "no-cache",
      },
    );
    //If data is not fully loaded, display progress
  if ( loading ) return (
  <div>
    <Grid>
        <Box>
      <CircularProgress></CircularProgress>
       <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Loading Subgraph...</Typography>
       </Box>
    </Grid>
  </div>);
  if (error) return (
  <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Error while fetching Balancer Subgraph data :(</Typography>
  );

  //Process pool data
 const poolArray = getPoolArray(data);

 console.log("poolArray", poolArray);

    return (
        <div>
            <Grid item xs={12}> <Typography>Swap Configuration</Typography> </Grid>
            <Box display="flex" justifyContent="center" p={0.5} key={'formField123'}>
                <Paper elevation={3} className={classes.form} variant="outlined" square>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            p: 0,
                            m: 1,
                        }}>
                        <FormControl fullWidth>
                        <InputLabel id="sellToken">Sell</InputLabel>
                        <Select
                            labelId="sellToken"
                            id="demo-simple-select"
                            value={sellToken}
                            label="Sell"
                            onChange={handleSellChange}
                        >
                            {sellMenuItems}

                        </Select>
                        </FormControl>
                        <TextField
                            id="sellTokenQuantity"
                            label="Sell Token Quantity"
                            type="text"
                            value={(sellTokenQuantity)}
                            onChange={(e) => handleSellTokenQuantityChange(e)}
                            error={isNaN(sellTokenQuantity)}
                            helperText={isNaN(sellTokenQuantity) ? "Sell token quantity must be a number" : ""}
                        />
                    </Box>
                </Paper>
            </Box>
        </div >
    );
}