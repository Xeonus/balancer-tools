import * as React from 'react';
import Box from '@mui/material/Box';
import { Grid, Paper } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { getVeBALPoolData } from '../../data/queries/operations';
import getPoolArray from '../../../utils/getPoolArray';
import { useQuery } from "@apollo/client";
import setAssetArrayFromPool from '../../../utils/setAssetArrayFromPool';
import { myStyles } from '../../../styles/styles';
import BalancerLogo from './../../../resources/logo-dark.svg'
import BalancerLogoLight from './../../../resources/logo-light.svg'
import BeethovenLogo from './../../../resources/beets-icon-large.png'

export default function VeBALPoolTraits(props) {

  //Init styles
  const classes = myStyles();

  //Pool Data query Hook (do not encapsulate for state)
  const { loading, error, data } = useQuery(
    getVeBALPoolData,
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

  //Lift state to parent (PriceImpactFormField)
  setAssetArrayFromPool(poolArray, "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014");
  
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
              Enter your deposits and lock time below. 
            </Box>
          </Box>
        </Paper>
      </Box>
    </div>
  )
}