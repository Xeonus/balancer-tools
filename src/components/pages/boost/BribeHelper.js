import * as React from 'react';
import { getGaugeUserVotes } from './../../data/queries/operations';
import { useQuery } from "@apollo/client";
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { networks } from '../../constants/networkConfigs';

export default function BribeHelper(props) {



    const network = networks.find(x => x.id === props.networkId);
//Fetch Gauge Data query Hook (do not encapsulate for state)
const {loading, error, data } = useQuery(
    getGaugeUserVotes,
    {
      context: {
        clientName: network.id,
        uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-gauges",
      },
      fetchPolicy: "no-cache",
    },
  );

    if (loading) return (
        <div>
          <Grid>
            <Box display="flex" justifyContent="center" alignItems={"center"} flexDirection="column">
              <CircularProgress></CircularProgress>
              <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span"> Loading Gauges and Pool data...</Typography>
            </Box>
          </Grid>
        </div>);
      if (error) return (
        <Typography noWrap={false} variant="subtitle1" color="textSecondary" component="span">Error while fetching Gauge or Balancer Subgraph data :(</Typography>
      );


      //Metrics
      let totalWeightLockSum = 0.0

      if (data.gaugeVotes) {
          console.log("data", data);
          //Obtain total weights
          data.gaugeVotes.forEach((voter) => {
            console.log(Number(voter.weight))
            totalWeightLockSum += (Number(voter.weight) * Number(voter.user.votingLocks[0].lockedBalance));
              

          })
          console.log("totalweight*LockedSum", totalWeightLockSum * 10**14);
          //Print relavite per user alloc
          data.gaugeVotes.forEach((voter) => {
            console.log(voter.user.id, " ", (Number(voter.weight) * Number(voter.user.votingLocks[0].lockedBalance)) / totalWeightLockSum * 100);
            //sum += (Number(voter.weight) * Number(voter.user.votingLocks[0].lockedBalance) / totalWeightLockSum )
              

          })
          //console.log("totalUserBribeWeightInPercent", sum*100)
          return( <Typography>Loaded</Typography>)
      }
      
}