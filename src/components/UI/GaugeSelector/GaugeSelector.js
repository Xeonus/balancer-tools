import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from '@mui/material';
import { getGaugeData } from './../../data/queries/operations';
import { useQuery } from "@apollo/client";
import { myStyles } from '../../../styles/styles';
import BalancerLogo from './../../../resources/logo-dark.svg'
import BalancerLogoLight from './../../../resources/logo-light.svg'
import BeethovenLogo from './../../../resources/beets-icon-large.png'
import getGaugeArray from '../../../utils/getGaugeArray';
import getTotalShareFromGaugeArray from '../../../utils/getTotalShareFromGaugeArray';

export default function PoolSelector(props) {

  //Init styles
  const classes = myStyles();

  //Lift state to parent (BoostForm)
  const handleChange = (event) => {
    const totalShare = getTotalShareFromGaugeArray(event.target.value, gaugeArray);
    console.log("totalShare", totalShare)
    props.onChange(event.target.value, props.veBAL, Number(totalStake).toFixed(2), props.share, Number(totalShare).toFixed(2));
  };

  //veBAL={veBAL} totalVeBALStaked={totalVeBALStaked} totalShare={totalShare} share={share}
  //handleIdChange(newId, veBAL, totalStake, share, totalShare)
  //Pool Data query Hook (do not encapsulate for state)
  const { loading, error, data } = useQuery(
    getGaugeData,
    {
      context: {
        clientName: props.network.id,
        uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges",
      },
      fetchPolicy: "no-cache",
    },
  );
  //If data is not fully loaded, display progress
  if (loading) return (
    <div>
      <Grid>
        <Box display="flex" justifyContent="center">
          <CircularProgress></CircularProgress>
          <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Loading Gauges...</Typography>
        </Box>
      </Grid>
    </div>);
  if (error) return (
    <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Error while fetching Gauge Subgraph data :(</Typography>
  );

  //Get Gauge Data
  const [gaugeArray, totalStake] = getGaugeArray(data);


  const balLogo = props.darkState ? BalancerLogo : BalancerLogoLight;

  return (
    <div>
      <Box display="flex" justifyContent="center" p={0.5} key={'poolSelector'}>
        <Paper className={classes.form} variant="outlined" square>
          <Box p={0.5} flexDirection="row" justifyContent="center" key={'poolSelector'}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box p={0.5}>
                <img src={props.network.id === 'fantom' ? BeethovenLogo : balLogo} alt="Balancer Logo" width="30" />
              </Box>
              <Box mb={0.5}>
                <Typography variant="h6" className={classes.root} key="appTitle">
                  Gauges
                </Typography>
              </Box>
            </Box>
            <Box>
              <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel
                  id="gaugeSelection"
                >
                  Select Gauge</InputLabel>
                <Select
                  labelId="gaugeSelection"
                  id="poolSelection-autowidth"
                  value={props.poolId}
                  onChange={handleChange}
                  autoWidth
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