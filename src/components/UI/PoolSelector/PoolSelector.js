import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { getBalancerPoolData } from './../../data/queries/operations';
import getPoolArray from '../../../utils/getPoolArray';
import { useQuery } from "@apollo/client";
import setAssetArrayFromPool from '../../../utils/setAssetArrayFromPool';

export default function PoolSelector(props) {

  //States
    var id = '';
    const handleChange = (event) => {
      props.onChange(event.target.value, setAssetArrayFromPool(poolArray, event.target.value));
    };

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
 //const assetArray = setAssetArrayFromPool(poolArray)

 console.log("targetArray", poolArray.find(x => x.id === props.poolId));
 console.log("assetArray", setAssetArrayFromPool(poolArray, props.poolId))


 return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel 
        id="poolSelection"
        >
          Pool configuration</InputLabel>
        <Select
          labelId="poolSelection"
          id="poolSelection-autowidth"
          value={props.poolId}
          onChange={handleChange}
          autoWidth
          label="Pool Selection"
        >
          {
          poolArray.map(item => (
            <MenuItem value={item.id}>{item.poolName}</MenuItem>
          ))
          };
        </Select>
      </FormControl>
    </div>
 );

  }