import React, { useState } from 'react';
import { myStyles } from '../../../styles/styles';
import { isBrowser } from 'react-device-detect';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { addAssetToArray } from '../../../utils/addAssetToArray';
import { resetAssetArray } from '../../../utils/resetAssetArray';
import { calculateILFromAssetArray } from '../../../utils/calculateILFromAssetArray';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import Header from '../../UI/Header';
import DataTable from './DataTable';
import DataTableTokens from './DataTableTokens';
import ShowCalcuation from './ShowCalculation';
import { calculateTotalPoolWeights } from '../../../utils/calculateTotalPoolWeight';
import { calculatePriceChange } from '../../../utils/calculatePriceChange';
import { ILGraphs } from './ILGraphs'
import PoolSelector from '../../UI/PoolSelector/PoolSelector';
import { networks } from '../../constants/networkConfigs';

export default function ILFormField(props) {

  //Init styles
  const classes = myStyles();

  //Init asset array
  const defaultArray = []
  const defaultAssetNames = ['BAL', 'WETH'];
  const defaultPriceChange = [150, -25];
  const defaultPoolWeights = [80, 20];
  const defaultEntryPrice = [10, 4000];
  const defaultExitPrice = [25, 3000];
  const [showInfo, setShowInfo] = useState(false)

  //Default init with 3 Assets
  for (let i = 0; i < defaultAssetNames.length; i++) {
    const entry = {
      id: i,
      assetName: defaultAssetNames[i],
      priceChange: defaultPriceChange[i],
      poolWeights: defaultPoolWeights[i],
      entryPrice: defaultEntryPrice[i],
      exitPrice: defaultExitPrice[i],
    }
    defaultArray.push(entry);
  }

  //Asset array state hook
  const [assetArray, setAssetArray] = React.useState(defaultArray);

  //Pool ID
  const [poolId, setPoolId] = React.useState('');

  //IL value state hook
  const [calcIL, setCalcIL] = React.useState(calculateILFromAssetArray(defaultArray));

  //Investment hook. TODO: refactor data structure, introduce REDUX?
  const [investment, setInvestment] = React.useState(1000);

  //Swap Fee hook TODO: Xeonus input / OK for now -> redux in the future?
  const [SwapFee, setSwapFee] = React.useState(10);

    //Set active network
    const network = networks.find(x => x.id === props.networkId);

  //Form Element state change handler

  const handleChange = (event, element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData[index][event.target.id] = event.target.value;

    if (event.target.id === "priceChange") {
      calculatePriceChange(clonedData, "priceChange");
    } else {
      calculatePriceChange(clonedData, "entryPrice");
    }
    setAssetArray(clonedData);
    setCalcIL(calculateILFromAssetArray(clonedData));
  };

  const errorTotalPoolWeights = (calculateTotalPoolWeights(assetArray) === 1 ? "" : "Total of pool weights must equal 100%");

  const handleInvestChange = (event) => {
    setInvestment(event.target.value);
  };

  const handleFeeChange = (event) => {
    setSwapFee(event.target.value);
  }

  //Remove entry
  const handleRemoveClick = (e, el) => {
    const index = assetArray.indexOf(el);
    const clonedData = [...assetArray];
    clonedData.splice(index, 1);
    setAssetArray(clonedData);
    setCalcIL(calculateILFromAssetArray(clonedData));
  }

  //Add entry
  const handleAddClick = (array) => {
    setAssetArray(addAssetToArray(array));
    setCalcIL(calculateILFromAssetArray(array));
  }

  //Reset data array
  const handleResetClick = (array) => {
    setAssetArray(resetAssetArray(array));
    setCalcIL(calculateILFromAssetArray(defaultArray));
  }

  //Toggle tooltip
  const handleToolTipClick = (showInfo) => {
    setShowInfo(!showInfo);
  }

  //Toggle Pool selector id change
  function handleIdChange(newId, newArray) {
    setPoolId(newId);
    setAssetArray(newArray);
    setCalcIL(calculateILFromAssetArray(newArray));

  }

  const investmentForm = () => (
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
            id="investment"
            label="Investment"
            type="text"
            size="small"
            value={(investment)}
            onChange={(e) => handleInvestChange(e)}
            error={isNaN(investment)}
            helperText={isNaN(investment) ? "Investment must be a number" : ""}
          />
          <TextField
            id="SwapFee"
            label="Rewards APR (%)"
            type="text"
            size="small"
            value={SwapFee}
            onChange={(e) => handleFeeChange(e)}
            error={isNaN(SwapFee)}
            helperText={isNaN(SwapFee) ? "Swap Fee must be a number" : ""}
          />
        </Box>
      </Paper>
    </Box>
  );

  const formElement = (element, id) => (
    <Box display="flex" justifyContent="center" p={0.5} key={ 'formField'+ id}>
      <Paper className={classes.form} variant="outlined" square>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            p: 0,
            m: 1,
          }}>
          <TextField
            id="assetName"
            label="Asset"
            multiline
            size="small"
            type="text"
            value={element.assetName}
            onChange={(e) => handleChange(e, element)}
          />

          <TextField
            id="priceChange"
            label="Price Change (%)"
            multiline
            size="small"
            type="number"
            value={element.priceChange}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.priceChange)}
            helperText={isNaN(element.priceChange) ? "Price Change % must be a number" : ""}
          />
          <TextField
            id="entryPrice"
            label="Entry Price ($)"
            multiline
            size="small"
            type="number"
            value={element.entryPrice}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.entryPrice)}
            helperText={isNaN(element.entryPrice) ? "Entry price ($) must be a number" : ""}
          />
          <TextField
            id="exitPrice"
            label="Exit Price ($)"
            multiline
            size="small"
            type="number"
            value={element.exitPrice}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.exitPrice)}
            helperText={isNaN(element.priceChange) ? "Entry price ($) must be a number" : ""}
          />
          <TextField
            id="poolWeights"
            label="Pool Weight"
            multiline
            size="small"
            type="number"
            value={element.poolWeights}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.poolWeights)}
            helperText={isNaN(element.poolWeights) ? "Pool Weight must be a number" : ""}
          />
          <Button
            className={classes.button}
            onClick={(e) => handleRemoveClick(e, element)}
          >
            <Box display="flex" alignItems="center" >
              <DeleteIcon /></Box>
            <Box ml={0.5}>
              {`Remove`}
            </Box>
          </Button>
        </Box>
      </Paper>
    </Box>
  );

  //Form components to add elements or reset the array
  const dataFunctionForm = () => (
    <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
      <Box mr={1}>
        <Button
          className={classes.button}
          onClick={(e) => handleAddClick(assetArray)}
        >
          <Box display="flex" alignItems="center" >
            <AddIcon /></Box>
          <Box ml={0.5}>
            {`Add Asset`}
          </Box>
        </Button>
      </Box>
      <Box mr={1}>
        <Button
          className={classes.button}
          onClick={(e) => handleResetClick(assetArray)}
        >
          <Box display="flex" alignItems="center" >
            <ReplayIcon /></Box>
          <Box ml={0.5}>
            {`Reset`}
          </Box>
        </Button>
      </Box>
    </Box>
  )


  //Investment Table
  //consisting of initial investment, value if held and value if held in pool

  const dataTable = (assetArray, investment, SwapFee) => (
    <Box display="flex" justifyContent="center" mb={2}>
        <DataTable assetArray={assetArray} investment={investment} SwapFee={SwapFee} darkState={props.darkState}></DataTable>
    </Box>
  )

  const dataTableTokens = (assetArray, investment, SwapFee) => (
    <Box display="flex" justifyContent="center" mt={2}>
        <DataTableTokens assetArray={assetArray} investment={investment} SwapFee={SwapFee} darkState={props.darkState}></DataTableTokens>
    </Box>
  )

  const toolTip = (assetArray, showInfo) => (

    showInfo ?
      <Box display="flex" justifyContent="center">
        <Paper  className={classes.paper} variant="outlined" square>
          <ShowCalcuation assetArray={assetArray}></ShowCalcuation>
        </Paper>
      </Box>
      : null
  )


  const iLGraphs = (assetArray, SwapFee, darkState) => (
    <Box display="flex" justifyContent="center" >
      <ILGraphs assetArray={assetArray} SwapFee={SwapFee} darkState={darkState}></ILGraphs>
    </Box>
  )

  return (
    <div>
      <PoolSelector network={network} poolId={poolId} onChange={handleIdChange} darkState={props.darkState}></PoolSelector>
      <Box className={classes.root} >
        {investmentForm()}
      </Box>
      <div style={{ color: 'crimson' }}>{errorTotalPoolWeights}</div>
      <form className={classes.root} noValidate autoComplete="off">
      
      <Typography color='primary' variant="h5">Pool configuration</Typography>
        {assetArray.map((asset) =>
          formElement(asset, assetArray.indexOf(asset))
        )}
      </form>
      {dataFunctionForm()}
      <Box mt={4}>
        <Button
          variant="outlined"
          onClick={(e) => handleToolTipClick(showInfo)}
        >
          {showInfo ? 'Hide calculation' : 'Show calculation'}
        </Button>
        {toolTip(assetArray, showInfo)}
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        p: 2,
      }}>
        <Paper className={classes.resultPaper}  variant="outlined" square >
          <Header>
            IL = {<DynamicValueFormatter value={Number(calcIL).toFixed(2)} name={'iLValue'} decimals={2} />} %
          </Header>
          {dataTable(assetArray, investment, SwapFee)}
          {dataTableTokens(assetArray, investment, SwapFee)}
          {isBrowser ? iLGraphs(assetArray, SwapFee, props.darkState) : null}
        </Paper>
      </Box>

    </div>
  );
};