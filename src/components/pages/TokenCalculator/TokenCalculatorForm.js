import * as React from 'react';
import { useEffect } from 'react';
import { myStyles } from '../../../styles/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Grid, Box, Typography } from '@mui/material';
import Header from '../../UI/Header';
import Slider from '@mui/material/Slider';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import { calculateVeBALOut } from '../../../utils/calculateVeBALOut';
import { networks } from "../../constants/networkConfigs";
import setAssetArrayFromPool from '../../../utils/setAssetArrayFromPool';
import { balPoolId } from '../../constants/poolIds';
import { CircularProgress } from '@mui/material';
import { getVeBALPoolData } from '../../data/queries/operations';
import getPoolArray from '../../../utils/getPoolArray';
import { useQuery } from "@apollo/client";
import { TokenCalculatorGraph } from './TokenCaclulatorGraph';
import { isBrowser } from 'react-device-detect';

export default function TokenCalculatorForm(props) {

    //Init styles
    const classes = myStyles();

    //Variable Hooks
    //----------HOOKS and default states-----------
    const defaultVeBALArray = []
    const defaultAssetNames = ["BAL", "WETH"]
    const defaultAssetBalance = [5000000, 7000]
    const defaultPoolWeights = [80, 20];
    const defaultDeposits = [1000, 5];

    //Default init with 3 Assets
    for (let i = 0; i < defaultAssetNames.length; i++) {
        const entry = {
            assetName: defaultAssetNames[i],
            assetBalance: defaultAssetBalance[i],
            poolWeights: defaultPoolWeights[i],
            tokenDeposits: defaultDeposits[i],
        }
        defaultVeBALArray.push(entry);
    }
    //Asset array state hook
    const [veBALArray, setVeBALArray] = React.useState(defaultVeBALArray);
    //Store BAL and ETH states separately, otherwise we end up with infinite state change loops upon user input!
    const [bal, setBal] = React.useState(1000);
    const [eth, setEth] = React.useState(0.5);
    const SwapFee = 2.0
    const [lockTime, setLockTime] = React.useState(52)
    const [calcVeBALOut, setCalcVeBALOut] = React.useState(calculateVeBALOut(veBALArray, SwapFee, lockTime)[2]);
    const [calcNetBPTOut, setNetBPTOut] = React.useState(calculateVeBALOut(veBALArray, SwapFee, lockTime)[0]);
    const network = networks.find(x => x.id === props.networkId);


    //Form Element state change handler
    const handleChange = (event, element) => {
        const index = veBALArray.indexOf(element);
        if (index === 0) {
            setBal(Number(event.target.value));
        } else {
            setEth(Number(event.target.value));
        }
        const clonedData = [...veBALArray];
        clonedData[index][event.target.id] = Number(event.target.value);
        setVeBALArray(clonedData);
        setCalcVeBALOut(calculateVeBALOut(veBALArray, SwapFee, lockTime)[2]);
        setNetBPTOut(calculateVeBALOut(veBALArray, SwapFee)[0]);
    }

    const handleLockTimeChange = (event) => {
        const clonedLockTime = [event.target.value];
        setLockTime(event.target.value);
        setCalcVeBALOut(calculateVeBALOut(veBALArray, SwapFee, clonedLockTime)[2]);
        setNetBPTOut(calculateVeBALOut(veBALArray, SwapFee)[0]);
    }

    const veBALFormElement = (element, id) => (
        <Box display="flex" justifyContent="center" p={0.5} key={'formField' + id}>
            <Paper className={classes.form} variant="outlined" square>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 0,
                        m: 1
                    }}>
                    <TextField
                        id="tokenDeposits"
                        label={element.assetName + " Deposit"}
                        multiline
                        size="small"
                        type="number"
                        value={element.tokenDeposits}
                        onChange={(e) => handleChange(e, element)}
                        error={isNaN(element.tokenDeposits)}
                        helperText={isNaN(element.tokenDeposits) ? "Token Deposits must be a number" : ""}
                    />
                </Box>
            </Paper>
        </Box>
    )

    const lockingFormElement = (id) => (
        <Box display="flex" justifyContent="center" p={0.5} key={'formField' + id}>
            <Paper className={classes.form} variant="outlined" square>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        m: 1
                    }}>
                    <Typography>Lock time ({lockTime} weeks)</Typography>
                    <Slider 
                    min={1}
                    max={52}
                    step={1}
                    value={lockTime}
                    defaultValue={52} 
                    onChange={(e) => handleLockTimeChange(e)}
                    aria-label="Default" 
                    valueLabelDisplay="auto" />
                </Box>
            </Paper>
        </Box>
    )

    const tokenCalculatorGraphs = (veBALArray, SwapFee, lockTime, darkState) => (
        <Box display="flex" justifyContent="center" >
            <TokenCalculatorGraph veBALArray={veBALArray} SwapFee={SwapFee} lockTime={lockTime} darkState={props.darkState}></TokenCalculatorGraph>
        </Box>
    )

  //Pool Data query Hook (do not encapsulate for state)
  const { loading, error, data } = useQuery(
    getVeBALPoolData,
    {
      context: {
        clientName: network.id,
        uri: network.graphQLEndPoint,
      },
      fetchPolicy: "no-cache",
    },
  );

  //Update state upon initial data load and relevant hook change
  useEffect( () => {
    if (data && !loading) {
    const balDataArray = setAssetArrayFromPool(getPoolArray(data), balPoolId);
    balDataArray[0].tokenDeposits = bal;
    balDataArray[1].tokenDeposits = eth;
    setVeBALArray(balDataArray);
    setCalcVeBALOut(calculateVeBALOut(balDataArray, SwapFee, lockTime)[2]);
    setNetBPTOut(calculateVeBALOut(balDataArray, SwapFee)[0]);
    }
    }, [data, loading, SwapFee, lockTime, bal, eth]);


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


  if(data && !loading) {

    return (
        <div>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection={"column"}>
                <Typography variant={"h7"}> Enter your BAL and WETH Deposits below.</Typography>
                <Typography variant={"h7"}> Then select your lock time to determine the veBAL quantity received.</Typography>
                
            </Box>     
            <form className={classes.root} noValidate autoComplete="off">
                {veBALArray.map((asset) =>
                    veBALFormElement(asset, asset.assetName)
                )}
            </form>
            {lockingFormElement()}
            
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <Paper className={classes.resultPaper} variant="outlined" square >
                <Paper className={classes.resultPaper} variant="outlined" square >
                    <Header>
                        BPT Out = {<DynamicValueFormatter value={Number(calcNetBPTOut).toFixed(4) > 0 ? Number(calcNetBPTOut).toFixed(4) : 100} name={'bptValue'} decimals={4} />}*
                    </Header>
                    <Header>
                        veBAL Out = {<DynamicValueFormatter value={Number(calcVeBALOut).toFixed(4) > 0 ? Number(calcVeBALOut).toFixed(4) : 100} name={'veBALValue'} decimals={4} />}*
                    </Header>

                    <Typography variant="caption">* Approximation </Typography>
                    </Paper>
                    {isBrowser ? tokenCalculatorGraphs(veBALArray, SwapFee, lockTime, props.darkState) : null}
                </Paper>
            </Box>
        </div>
    );
    }
}