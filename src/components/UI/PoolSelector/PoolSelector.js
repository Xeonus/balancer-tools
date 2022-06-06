import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
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
import { myStyles } from '../../../styles/styles';
import BalancerLogo from './../../../resources/logo-dark.svg'
import BalancerLogoLight from './../../../resources/logo-light.svg'
import BeethovenLogo from './../../../resources/beets-icon-large.png'

export default function PoolSelector(props) {

  //Init styles
  const classes = myStyles();

  //Lift state to parent (PriceImpactFormField)
  const handleChange = (event) => {
    props.onChange(event.target.value, setAssetArrayFromPool(poolArray, event.target.value));
  };

  //Pool Data query Hook (do not encapsulate for state)
  const { loading, error, data } = useQuery(
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
  if (loading) return (
    <div>
      <Grid>
      <Box display="flex" justifyContent="center" alignItems={"center"} flexDirection="column">
          <CircularProgress></CircularProgress>
          <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Loading Pool Data...</Typography>
        </Box>
      </Grid>
    </div>);
  if (error) return (
    <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Error while fetching Balancer Subgraph data :(</Typography>
  );

  //Initialize pool data
  const poolArray = getPoolArray(data);
  
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
                  {props.network.id === 'fantom' ? 'Beethoven-X' : 'Balancer'} Pools
                </Typography>
              </Box>
            </Box>
            <Box>
              <FormControl sx={{ m:1, minWidth: 200 }} size="small">
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

                  label="Pool configuration"
                >
                  {
                    poolArray.map(item => (
                      <MenuItem
                        key={item.id}
                        value={item.id}>
                        {item.poolName + ": " + item.shortName}
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