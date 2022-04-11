import React, {useEffect} from 'react';
import { myStyles } from '../../../styles/styles';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import Header from '../../UI/Header';
import GaugeSelector from '../../UI/GaugeSelector/GaugeSelector';
import { networks } from '../../constants/networkConfigs';
import { calculateBoostFromGauge } from '../../../utils/calculateBoostFromGauge';

export default function BoostForm(props) {

    //Init styles
    const classes = myStyles();

    //Variable Hooks
    const [veBAL, setveBAL] = React.useState(500.0);
    const [totalVeBALStaked, setTotalVeBALStaked] = React.useState(800000.0);
    const [share, setShare] = React.useState(500.0);
    const [totalShare, setTotalShare] = React.useState(10000.0);
    const [boost, setBoost] = React.useState(1.0);
    const [poolId, setPoolId] = React.useState('');
    const network = networks.find(x => x.id === props.networkId);

    //Event handlers
    const handleVeBALChange = (event) => {
        setveBAL(event.target.value);
        setBoost(calculateBoostFromGauge(veBAL, totalVeBALStaked, share, totalShare));
    }

    const handleTotalVeBALChange = (event) => {
        setTotalVeBALStaked(event.target.value);
        setBoost(calculateBoostFromGauge(veBAL, totalVeBALStaked, share, totalShare));
    }
    const handleShareChange = (event) => {
        setShare(event.target.value);
        setBoost(calculateBoostFromGauge(veBAL, totalVeBALStaked, share, totalShare));
    }
    const handleTotalShareChange = (event) => {
        setTotalShare(event.target.value);
        setBoost(calculateBoostFromGauge(veBAL, totalVeBALStaked, share, totalShare));
    }

    //Toggle Gauge selector id change
  function handleIdChange(newId, veBAL, totalStake, share, totalShare) {
    setPoolId(newId);
    setveBAL(veBAL);
    setTotalShare(totalShare);
    setShare(share);
    setTotalVeBALStaked(totalStake);
    setBoost(calculateBoostFromGauge(veBAL, totalStake, share, totalShare));

  }

  //Explicitly trigger state changes on user input updates!
  useEffect(() => {
    setBoost(calculateBoostFromGauge(veBAL, totalVeBALStaked, share, totalShare));
  }, [veBAL, totalVeBALStaked, share, totalShare]);


    //Boost input fields
    const boostForm = () => (
        <Box display="flex" justifyContent="center" p={0.5}>
            <Paper className={classes.form} variant="outlined" square>
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 1,
                        m: 1,
                    }}>
                    <TextField
                        id="veBAL"
                        label="Your locked veBAL"
                        type="text"
                        size="small"
                        value={veBAL}
                        onChange={(e) => handleVeBALChange(e)}
                        error={isNaN(veBAL)}
                        helperText={isNaN(veBAL) ? "Locked veBAL must be a number" : ""}
                    />
                    <TextField
                        id="totalveBAL"
                        label="Total veBAL Locked"
                        type="text"
                        size="small"
                        value={totalVeBALStaked}
                        onChange={(e) => handleTotalVeBALChange(e)}
                        error={isNaN(totalVeBALStaked)}
                        helperText={isNaN(totalVeBALStaked) ? "Total veBAL Staked must be a number" : ""}
                    />
                    <TextField
                        id="yourShare"
                        label="Your Staked Share ($)"
                        type="text"
                        size="small"
                        value={(share)}
                        onChange={(e) => handleShareChange(e)}
                        error={isNaN(share)}
                        helperText={isNaN(share) ? "Your share must be a number" : ""}
                    />
                    <TextField
                        id="totalShare"
                        label="Gauge TVL Staked ($)"
                        type="text"
                        size="small"
                        value={totalShare}
                        onChange={(e) => handleTotalShareChange(e)}
                        error={isNaN(totalShare)}
                        helperText={isNaN(totalShare) ? "Total share must be a number" : ""}
                    />
                </Box>
            </Paper>
        </Box>
    );

    return (
        <div>
            <GaugeSelector network={network} poolId={poolId} veBAL={veBAL} totalVeBALStaked={totalVeBALStaked} totalShare={totalShare} share={share} onChange={handleIdChange} darkState={props.darkState}></GaugeSelector>
            <Box className={classes.root} >
                {boostForm()}
            </Box>
            <Box>
                    <Header>
                        veBAL Boost = {<DynamicValueFormatter value={Number(boost).toFixed(2)} name={'boostValue'} decimals={2} />}x
                    </Header>
            </Box>

        </div>
    );
};