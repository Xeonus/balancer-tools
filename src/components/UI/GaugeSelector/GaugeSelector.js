import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { getGaugeData, getBalancerPoolData } from './../../data/queries/operations';
import { useQuery } from "@apollo/client";
import { myStyles } from '../../../styles/styles';
import BalancerLogo from './../../../resources/logo-dark.svg'
import BalancerLogoLight from './../../../resources/logo-light.svg'
import BeethovenLogo from './../../../resources/beets-icon-large.png'
import getGaugeArray from '../../../utils/getGaugeArray';
import getVyperIdFromPoolId from '../../../utils/getVyperIdFromPoolId';
import getPoolArray from '../../../utils/getPoolArray';
import vyperABI from './../../constants/ABIs/vyperABI.json'
import veBALABI from './../../constants/ABIs/veBALABI.json'
import { ethers } from "ethers";
import getWorkingSupplyPoolInUsd from '../../../utils/getWorkingSupplyPoolInUsd';

export default function PoolSelector(props) {

  //Init styles
  const classes = myStyles();

  //Handle poolID change and asynchronously call vyper contract to get working_supply -> TODO refactor call
  const handleChange = async (event) => {
    let provider;
    //if (window.ethereum) {
    //  provider = new ethers.providers.Web3Provider(window.ethereum);
    //} else {
      provider = new ethers.providers.InfuraProvider("homestead" ,'bd237506d816456797b7bede8375e021');
    //}
    //Vyper contract to get working supply
    const vyperContract = new ethers.Contract(
    getVyperIdFromPoolId(event.target.value, gaugeArray),
    vyperABI,
    provider
  );
  //Vebal contract to get total supply of veBAL
  const veBALContract = new ethers.Contract(
    '0xC128a9954e6c874eA3d62ce62B468bA073093F25',
    veBALABI,
    provider
  );
  let resp = 0;
  let totalStake = 0;
  resp = await vyperContract.working_supply();
  totalStake = await vyperContract.totalSupply();
  const veBalResp = await veBALContract.totalSupply(Math.floor(Date.now() / 1000));
  if (resp > 0) {
  const working_supply_pool = getWorkingSupplyPoolInUsd(event.target.value, gaugeArray, ethers.utils.formatEther(resp))
  const totalStakeInUSD = getWorkingSupplyPoolInUsd(event.target.value, gaugeArray, ethers.utils.formatEther(totalStake))
  props.onChange(event.target.value, props.newlockedVeBAL, props.lockedVeBAL, Number(ethers.utils.formatEther(veBalResp)).toFixed(2), props.newShare, props.share, Number(working_supply_pool).toFixed(2), Number(totalStakeInUSD).toFixed(2));
  }  
};

  //Fetch Gauge Data query Hook (do not encapsulate for state)
  const {loading, error, data } = useQuery(
    getGaugeData,
    {
      context: {
        clientName: props.network.id,
        uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges",
      },
      fetchPolicy: "no-cache",
    },
  );

  //Pool Data selector
  const { loading: poolLoading, error: poolError, data: poolData } = useQuery(
    getBalancerPoolData,
    {
      context: {
        clientName: props.network.id,
        uri: props.network.graphQLEndPoint,
      },
      fetchPolicy: "no-cache",
    },
  );

  //If data is not fully loaded, display progress
  if (loading || poolLoading) return (
    <div>
      <Grid>
        <Box display="flex" justifyContent="center">
          <CircularProgress></CircularProgress>
          <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Loading Gauges and Pool data...</Typography>
        </Box>
      </Grid>
    </div>);
  if (error || poolError) return (
    <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Error while fetching Gauge or Balancer Subgraph data :(</Typography>
  );

  //Get Gauge Data by stitching together gauge and pool-data (for pool names and shares)
  const poolArray = getPoolArray (poolData);
  const gaugeArray = getGaugeArray(data, poolArray);


  
  const balLogo = props.darkState ? BalancerLogo : BalancerLogoLight;

  return (
    <div>
      <Box mb={0.5} display="flex" justifyContent="center" key={'poolSelector'}>
        <Paper className={classes.form} variant="outlined" square>
          <Box p={1} flexDirection="row" justifyContent="center" key={'poolSelector'}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box mb={0.5}>
                <img src={props.network.id === 'fantom' ? BeethovenLogo : balLogo} alt="Balancer Logo" width="30" />
              </Box>
              <Box mb={0.5}>
                <Typography variant="h6" className={classes.root} key="appTitle">
                  Liquidity Mining Gauges
                </Typography>
              </Box>
            </Box>
            <Box>
              <FormControl sx={{ m:1, minWidth: 200 }} size="small">
                <InputLabel
                  id="gaugeSelection"
                >
                  Select Gauge</InputLabel>
                <Select
                  labelId="gaugeSelection"
                  id="poolSelection-autowidth"
                  value={props.poolId}
                  onChange={handleChange}
                  label="Select Gauge"
                >
                  {
                    gaugeArray.map(item => (
                      <MenuItem
                        key={item.poolId}
                        value={item.poolId}>
                        {item.name}
                      </MenuItem>
                    ))
                  };
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );

}