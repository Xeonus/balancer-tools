import * as React from 'react';
import { myStyles } from '../../../styles/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Header from '../../UI/Header';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import { calculateVeBALOut } from '../../../utils/calculateVeBALOut';
import { networks } from "../../constants/networkConfigs";
import VeBALPoolTraits from '../../UI/PoolSelector/VeBALPoolTraits';

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
    const [SwapFee, setSwapFee] = React.useState(2.0);
    const [lockTime, setLockTime] = React.useState(52)
    const [lockTimeError, setLockTimeError] = React.useState(false)
    const [calcVeBALOut, setCalcVeBALOut] = React.useState(calculateVeBALOut(veBALArray, SwapFee, lockTime)[2]);
    const [calcNetBPTOut, setNetBPTOut] = React.useState(calculateVeBALOut(veBALArray, SwapFee, lockTime)[0]);
    const network = networks.find(x => x.id === props.networkId);
    const poolId = "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014";

        //Form Element state change handler
        const handleChange = (event, element) => {
            const index = veBALArray.indexOf(element);
            const clonedData = [...veBALArray];
            clonedData[index][event.target.id] = event.target.value;
            setVeBALArray(clonedData);
            setCalcVeBALOut(calculateVeBALOut(veBALArray, SwapFee, lockTime)[2]);
            setNetBPTOut(calculateVeBALOut(veBALArray, SwapFee)[0]);
        }

        function handleLoadingChange(newArray) {
            setVeBALArray(newArray);
            setCalcVeBALOut(calculateVeBALOut(newArray, SwapFee, lockTime)[2]);
            setNetBPTOut(calculateVeBALOut(newArray, SwapFee, lockTime)[0]);
            setSwapFee(newArray[0].swapFee * 100);
        }

        const handleLockTimeChange = (event) => {
            const clonedLockTime = [event.target.value];
            setLockTime(event.target.value);
            setLockTimeError(isNaN(clonedLockTime) ? true : false)
            setLockTimeError(clonedLockTime < 52.001 && clonedLockTime > 0.999 ? false : true)
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
                        label= {element.assetName + " Deposit" }
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
                        p: 0,
                        m: 1
                    }}>
                    <TextField
                        id="LockTime"
                        label="Lock Time (weeks)"
                        type="text"
                        size="small"
                        value={lockTime}
                        onChange={(e) => handleLockTimeChange(e)}
                        error= {lockTimeError}
                        helperText={lockTimeError ? "Lock time must be a value in weeks from 1-52" : ""}
                    />
                </Box>
            </Paper>
        </Box>
    )

    return (
        <div>
            <VeBALPoolTraits darkState={props.darkState} network={network} poolId={poolId} onChange={handleLoadingChange}></VeBALPoolTraits>
            {veBALFormElement}
                <form className={classes.root} noValidate autoComplete="off">
                    {veBALArray.map((asset) =>
                        veBALFormElement(asset, asset.assetName)
                    )}
                </form>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 1
            }}>
                <Paper className={classes.resultPaper} variant="outlined" square >
                <Header>
                        BPT Out = {<DynamicValueFormatter value={Number(calcNetBPTOut).toFixed(4) > 0 ? Number(calcNetBPTOut).toFixed(4): 100} name={'bptValue'} decimals={4} />} 
                    </Header>
                </Paper>
            </Box>
            {lockingFormElement()}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                mt: 1
            }}>
            <Paper className={classes.resultPaper} variant="outlined" square >
                <Header>
                        veBAL Out = {<DynamicValueFormatter value={Number(calcVeBALOut).toFixed(4) > 0 ? Number(calcVeBALOut).toFixed(4): 100} name={'veBALValue'} decimals={4} />} 
                    </Header>
                </Paper>
                </Box>
        </div>
    );
}