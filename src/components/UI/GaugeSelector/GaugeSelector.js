import * as React from 'react';
import { useRef} from 'react';
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
import getBPTPricePerPoolId from '../../../utils/getBPTPricePerPoolId';
import VeBALBPTPrice from '../../pages/boost/VeBALBPTPrice';
import getGaugeArrayTokenSet from '../../../utils/getGaugeArrayTokenSet';
import getPricePerBPTFromTokenSet from '../../../utils/getPricePerBPTFromTokenSet';
import getWorkingSupplyPoolInUsd from '../../../utils/getWorkingSupplyPoolInUsd';
import getBALBPTPricePerPoolId from '../../../utils/getBALBPTSpotPrice';
import getWETHBPTPricePerPoolId from '../../../utils/getWETHBPTSpotPrice';
//import { calculateGaugeAPR } from '../../../utils/calculateGaugeAPR';

export default function PoolSelector(props) {

  //Init styles
  const classes = myStyles();
  const tokenState = useRef('0xba100000625a3754423978a60c9317c58a424e3d%2C0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
  const is_killed = useRef('false');
  //Handle poolID change and asynchronously call vyper contract to get working_supply -> TODO refactor call
  const handleChange = async (event) => {
    let provider;
    provider = new ethers.providers.InfuraProvider("homestead" ,'bd237506d816456797b7bede8375e021');

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
  is_killed.current = await vyperContract.is_killed();
  //console.log("is_killed", is_killed);
  const veBalResp = await veBALContract.totalSupply(Math.floor(Date.now() / 1000));
    if (resp > 0) {
      tokenState.current = getGaugeArrayTokenSet(event.target.value, gaugeArray)
      const response = await fetch('https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=' + tokenState.current + '%2C&vs_currencies=usd');
      const fetchedPriceData = await response.json();
      if (fetchedPriceData) {
        //console.log("calculated_tvl", getTVLFromTokenSet(gaugeArray, event.target.value, fetchedPriceData));
        //console.log("calculated_BPTPrice", getPricePerBPTFromTokenSet(gaugeArray, event.target.value, fetchedPriceData));
        let working_supply_pool = 0;
        let totalStakeInUSD = 0;
        //TODO: refactor Boost logic
        //Calcuation for non-boosted pools:
        if (event.target.value !== '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe' && event.target.value !== '0xa13a9247ea42d743238089903570127dda72fe4400000000000000000000035d') {
        working_supply_pool = getPricePerBPTFromTokenSet(gaugeArray, event.target.value, fetchedPriceData) * ethers.utils.formatEther(resp);
        totalStakeInUSD = getPricePerBPTFromTokenSet(gaugeArray, event.target.value, fetchedPriceData) * ethers.utils.formatEther(totalStake);
        } else {
          working_supply_pool = getWorkingSupplyPoolInUsd(event.target.value, gaugeArray, ethers.utils.formatEther(resp));
          totalStakeInUSD = getWorkingSupplyPoolInUsd(event.target.value, gaugeArray, ethers.utils.formatEther(totalStake));
        }
        //const apr = calculateGaugeAPR(event.target.value, gaugeArray, 1, 0.0842, ethers.utils.formatEther(resp), 6.88);
        props.onChange(event.target.value, props.newlockedVeBAL, props.lockedVeBAL, Number(ethers.utils.formatEther(veBalResp)).toFixed(2), props.newShare, props.share, Number(working_supply_pool).toFixed(2), Number(totalStakeInUSD).toFixed(2));
      }
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
        <Box display="flex" justifyContent="center" alignItems={"center"} flexDirection="column">
          <CircularProgress></CircularProgress>
          <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span"> Loading Gauges and Pool data...</Typography>
        </Box>
      </Grid>
    </div>);
  if (error || poolError) return (
    <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Error while fetching Gauge or Balancer Subgraph data :(</Typography>
  );

  //Get Gauge Data by stitching together gauge and pool-data (for pool names and shares)

  
  const poolArray = getPoolArray(poolData);
  //console.log("poolArray", poolArray)
  const gaugeArray = getGaugeArray(data, poolArray);
  //console.log("gaugeArray", gaugeArray)


  const balLogo = props.darkState ? BalancerLogo : BalancerLogoLight;

  return (
    <div>
      <VeBALBPTPrice bptPrice={getBPTPricePerPoolId(poolArray, '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014')} 
      balSpotPrice={getBALBPTPricePerPoolId(poolArray, '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014')}
      wethSpotPrice={getWETHBPTPricePerPoolId(poolArray, '0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014')}></VeBALBPTPrice>
      <Box mb={0.5} display="flex" justifyContent="center" key={'poolSelector'}>
        <Paper className={classes.form} variant="outlined" square>
          <Box p={1} flexDirection="row" justifyContent="center" key={'poolSelector'}>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection={"row"}>
              <Box mb={0.5}>
                <img src={props.network.id === 'fantom' ? BeethovenLogo : balLogo} alt="Balancer Logo" width="30" />
              </Box>
              <Box mb={0.5} pl={0.5}>
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
                        key={item.id}
                        value={item.poolId}>
                        {item.name}
                      </MenuItem>
                    ))
                  };
                </Select>
                <Box mt={1}>
                  {is_killed.current === true ? <Typography color="red" >EXPIRED Gauge!</Typography> : null}
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  );

}