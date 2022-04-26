import React, { useEffect } from 'react';
import { myStyles } from '../../../styles/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Box, Typography, Tooltip, Link } from '@mui/material';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import GaugeSelector from '../../UI/GaugeSelector/GaugeSelector';
import { networks } from '../../constants/networkConfigs';
import { calculateBoostFromGauge } from '../../../utils/calculateBoostFromGauge';
import { calculateMaxBoost } from '../../../utils/calculateMaxBoost';
import { calculateMinVeBAL } from '../../../utils/calculateMinVeBal';
import { isBrowser } from 'react-device-detect';

export default function BoostForm(props) {

    //Init styles
    const classes = myStyles();

    //Variable Hooks
    const [lockedVeBAL, setlockedVeBAL] = React.useState(500.0);
    const [newlockedVeBAL, setNewlockedVeBAL] = React.useState(0.0);
    const [totallockedVeBALStaked, setTotallockedVeBALStaked] = React.useState(800000.0);
    const [share, setShare] = React.useState(500.0);
    const [newShare, setNewShare] = React.useState(0.0);
    const [totalShare, setTotalShare] = React.useState(10000.0);
    const [totalStakedLiquidity, setTotalStakedLiquidity] = React.useState(10000.0);
    const [boost, setBoost] = React.useState(1.0);
    const [poolId, setPoolId] = React.useState('');
    const network = networks.find(x => x.id === props.networkId);
    const [maxBoost, setMaxBoost] = React.useState(1.0);
    const [minVeBAL, setMinVeBAL] = React.useState(100000);

    //Event handlers
    const handlelockedVeBALChange = (event) => {
        setlockedVeBAL(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }
    const handleNewLockedVeBALChange = (event) => {
        setNewlockedVeBAL(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }
    const handleTotallockedVeBALChange = (event) => {
        setTotallockedVeBALStaked(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }
    const handleShareChange = (event) => {
        setShare(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }
    const handleNewShareChange = (event) => {
        setNewShare(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }
    const handleTotalShareChange = (event) => {
        setTotalShare(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }
    const handleTotalStakedLiquidityChange = (event) => {
        setTotalStakedLiquidity(event.target.value);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }


    //Toggle Gauge selector id change
    function handleIdChange(newId, newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity) {
        setPoolId(newId);
        setlockedVeBAL(lockedVeBAL);
        setNewlockedVeBAL(newlockedVeBAL);
        setTotalShare(totalShare);
        setShare(share);
        setNewShare(newShare);
        setTotallockedVeBALStaked(totallockedVeBALStaked);
        setTotalStakedLiquidity(totalStakedLiquidity);
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));

    }

    //Explicitly trigger state changes on user input updates!
    useEffect(() => {
        setBoost(calculateBoostFromGauge(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMaxBoost(calculateMaxBoost(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
        setMinVeBAL(calculateMinVeBAL(newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity));
    }, [newlockedVeBAL, lockedVeBAL, totallockedVeBALStaked, newShare, share, totalShare, totalStakedLiquidity]);


    //Network Params form
    const gaugeParamsForm = () => (
        <Box display="flex" justifyContent="center" p={0.5}>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                }}>
                <Tooltip arrow placement="top" title="The global amount of veBAL locked">
                    <TextField
                        id="totallockedVeBAL"
                        label="Total veBAL Locked"
                        type="text"
                        size="small"
                        value={totallockedVeBALStaked}
                        onChange={(e) => handleTotallockedVeBALChange(e)}
                        error={isNaN(totallockedVeBALStaked)}
                        helperText={isNaN(totallockedVeBALStaked) ? "Total veBAL locked must be a number" : ""}
                    />
                </Tooltip>
                <TextField
                    id="totalShare"
                    label="Gauge Working Staked Supply ($)"
                    type="text"
                    size="small"
                    value={totalShare}
                    onChange={(e) => handleTotalShareChange(e)}
                    error={isNaN(totalShare)}
                    helperText={isNaN(totalShare) ? "Gauge working supply must be a number" : ""}
                />
                <TextField
                    id="totalLiquidityStaked"
                    label="Gauge Total Liquidity Staked ($)"
                    type="text"
                    size="small"
                    value={totalStakedLiquidity}
                    onChange={(e) => handleTotalStakedLiquidityChange(e)}
                    error={isNaN(totalStakedLiquidity)}
                    helperText={isNaN(totalStakedLiquidity) ? "Total share must be a number" : ""}
                />
            </Box>
        </Box>
    )
    //user input fields
    const userInputForm = () => (
        <Box display="flex" justifyContent="center" p={0.5}>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                }}>
                <Tooltip arrow placement="top" title="The amount of veBAL you have locked. You can retrieve this amount from the veBAL page at https://app.balancer.fi/#/vebal">
                    <TextField
                        id="lockedVeBAL"
                        label="Your locked veBAL"
                        type="text"
                        size="small"
                        value={lockedVeBAL}
                        onChange={(e) => handlelockedVeBALChange(e)}
                        error={isNaN(lockedVeBAL)}
                        helperText={isNaN(lockedVeBAL) ? "Locked lockedVeBAL must be a number" : ""}
                    />
                </Tooltip>
                <TextField
                    id="newLockedVeBAL"
                    label="New/additional veBAL to lock"
                    type="text"
                    size="small"
                    value={newlockedVeBAL}
                    onChange={(e) => handleNewLockedVeBALChange(e)}
                    error={isNaN(newlockedVeBAL)}
                    helperText={isNaN(newlockedVeBAL) ? "Total lockedVeBAL Staked must be a number" : ""}
                />
                <TextField
                    id="yourShare"
                    label="Your already staked BPT ($)"
                    type="text"
                    size="small"
                    value={(share)}
                    onChange={(e) => handleShareChange(e)}
                    error={isNaN(share)}
                    helperText={isNaN(share) ? "Your share must be a number" : ""}
                />
                <TextField
                    id="additionalShare"
                    label="Additional/New Staked BPT ($)"
                    type="text"
                    size="small"
                    value={(newShare)}
                    onChange={(e) => handleNewShareChange(e)}
                    error={isNaN(newShare)}
                    helperText={isNaN(newShare) ? "Additional staked share must be a number" : ""}
                />

            </Box>
        </Box>
    );

    return (
        <div>
            <Box mb={0.5}>
                <Typography variant={isBrowser ? "h4": "h5"}>
                    veBAL Boost = {<DynamicValueFormatter value={Number(boost).toFixed(3)} name={'boostValue'} decimals={3} />}* x
                </Typography>
                <Typography> Max. Possible Boost = {<DynamicValueFormatter value={Number(maxBoost).toFixed(3)} name={'maxBoostValue'} decimals={3} />}* x 
                </Typography>
                <Typography> Min. veBAL for Max. Boost = {<DynamicValueFormatter value={Number(minVeBAL).toFixed(3)} name={'minVeBAL'} decimals={2} />}*
                </Typography>
                <Typography variant="caption">* Approximation </Typography>
            </Box>
            <GaugeSelector
                network={network}
                poolId={poolId}
                lockedVeBAL={lockedVeBAL}
                newlockedVeBAL={newlockedVeBAL}
                totallockedVeBALStaked={totallockedVeBALStaked}
                totalShare={totalShare}
                share={share}
                newShare={newShare}
                totalStakedLiquidity={totalStakedLiquidity}
                onChange={handleIdChange}
                darkState={props.darkState}>
            </GaugeSelector>
            <Box mt={0.5} display="flex" alignItems="center" justifyContent="center">
                <Paper className={classes.form} variant="outlined" square>
                    <Box className={classes.root} >
                        <Typography variant="h6">Gauge Parameters</Typography>
                        {gaugeParamsForm()}
                    </Box>
                </Paper>
            </Box>
            <Box mt={0.5} display="flex" alignItems="center" justifyContent="center">
                <Paper className={classes.form} variant="outlined" square>
                    <Box className={classes.root}>
                        <Typography variant="h6">User configuration</Typography>
                        {userInputForm()}
                    </Box>
                </Paper>
            </Box>
            <Box mt={2} mb={2} display="flex" alignItems="center" justifyContent="center">
                <Box className={classes.root}>
                    <Typography>You can find additional information about veBAL Boosting on our <Link href="https://balancer-dao.gitbook.io/learn-about-balancer/fundamentals/vebal-tokenomics/financial-implications/boosting-bal-incentives/calculating-my-boost" target="_blank">DAO community documentation</Link></Typography>
                </Box>
            </Box>
        </div>
    );
};