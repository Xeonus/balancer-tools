import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { addAssetToArray } from '../../../utils/addAssetToArray';
import { resetAssetArray } from '../../../utils/resetAssetArray';
import { calculateILFromAssetArray } from '../../../utils/calculateILFromAssetArray';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import Header from '../../UI/Header';
import DataTable from './DataTable';
import ShowCalcuation from './ShowCalculation';
import { calculateTotalPoolWeights } from '../../../utils/calculateTotalPoolWeight';
import { ILGraphs } from './ILGraphs' 

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '30ch',
      color: "primary"
    },
    '& .MuiSlider-root': {
      margin: theme.spacing(1),
      width: '30ch',
      color: "primary"
    },
  },
  slider: {
    width: 200,
  },
  paperDark: {
    '@media only screen and (min-width: 600px)': {
      padding: theme.spacing(1),
    },

    textAlign: 'center',
    align: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#35384a',
    borderRadius: "5px",
    margin: '10px'
  },
  paper: {
    '@media only screen and (min-width: 600px)': {
      padding: theme.spacing(1),
    },
    textAlign: 'center',
    align: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: "5px",
    margin: '10px',
    minWidth: 'auto',
  },
  form: {
    textAlign: 'center',
    align: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    color: "#fff",
    height: "35px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    backgroundSize: "200% 100%",
    transition: "all .2s ease-out",
    background: "linear-gradient(90deg,#00f,#f0f,#00f)",
    '&:hover': {
      backgroundPosition: "100% 0",
      boxShadow: "0 4px 15px 0 rgb(255 100 50 / 0%)",
      transition: "all .2s ease-out",
    },
    boxShadow: "0 4px 15px 0 rgb(224 100 61 / 8%)",
    margin: "0",
    border: "0",
    size: "small",
  },
}));

export default function ILFormField(props) {

  //Init styles
  const classes = useStyles();

  //Init asset array
  const defaultArray = []
  const defaultAssetNames = ['BAL', 'WBTC', 'WETH'];
  const defaultPriceChange = ['400', '150', '400'];
  const defaultPoolWeights = ['50', '34', '16'];
  const [showInfo, setShowInfo] = useState(false)

  //Default init with 3 Assets
  for (let i = 0; i < defaultAssetNames.length; i++) {
    const entry = {
      assetName: defaultAssetNames[i],
      priceChange: defaultPriceChange[i],
      poolWeights: defaultPoolWeights[i],
    }
    defaultArray.push(entry);
  }

  //Asset array state hook
  const [assetArray, setAssetArray] = React.useState(defaultArray);

  //IL value state hook
  const [calcIL, setCalcIL] = React.useState(calculateILFromAssetArray(defaultArray));

  //Investment hook. TODO: refactor data structure, introduce REDUX?
  const [investment, setInvestment] = React.useState(1000);

  //Swap Fee hook TODO: Xeonus input / OK for now -> redux in the future?
  const [SwapFee, setSwapFee] = React.useState(1);

  //Form Element state change handler

  const handleChange = (event, element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData[index][event.target.id] = event.target.value;
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

  const investmentForm = () => (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} className={classes.paper}>
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
            rowsMax={1}
            type="text"
            value={(investment)}
            onChange={(e) => handleInvestChange(e)}
            error={isNaN(investment)}
            helperText={isNaN(investment) ? "Investment must be a number" : ""}
          />
          <TextField
            id="SwapFee"
            label="Swap Fee APY (%)"
            rowsMax={1}
            type="text"
            value={SwapFee}
            onChange={(e) => handleFeeChange(e)}
            error={isNaN(SwapFee)}
            helperText={isNaN(SwapFee) ? "Swap Fee must be a number" : ""}
          />
        </Box>
      </Paper>
    </Box>
  );

  const formElement = (element) => (
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} className={classes.form} variant="outlined" square>
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
            id="assetName"
            label="Asset"
            multiline
            size="small"
            rowsMax={1}
            type="text"
            value={element.assetName}
            onChange={(e) => handleChange(e, element)}
          />

          <TextField
            id="priceChange"
            label="Price Change (%)"
            multiline
            size="small"
            rowsMax={1}
            type="number"
            value={element.priceChange}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.priceChange)}
            helperText={isNaN(element.priceChange) ? "Price Change % must be a number" : ""}
          />
          <TextField
            id="poolWeights"
            label="Pool Weight"
            multiline
            size="small"
            rowsMax={1}
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
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} className={classes.form} variant="outlined" square>
        <DataTable assetArray={assetArray} investment={investment} SwapFee={SwapFee} darkState={props.darkState}></DataTable>
    </Paper>
    </Box>
  )

  const toolTip = (assetArray, showInfo) => (

    showInfo ? 
    <Box display="flex" justifyContent="center">
      <Paper elevation={3} className={classes.paper} variant="outlined" square>
        <ShowCalcuation assetArray={assetArray}></ShowCalcuation>
    </Paper>
    </Box>
    : null
  )


  const iLGraphs = (assetArray) => (
    <Box display="flex" justifyContent="center" >
    <ILGraphs assetArray = {assetArray}></ILGraphs>
  </Box>
  )
  return (
    <div>
      <Box>
        <Header>
          IL = {<DynamicValueFormatter value={Number(calcIL).toFixed(2)} name={'iLValue'} decimals={2} />} %
        </Header>
        { iLGraphs(assetArray) }
        {dataTable(assetArray, investment, SwapFee)}
        
        <div style={{ color: 'crimson' }}>{errorTotalPoolWeights}</div>
      </Box>
      <Box className={classes.root} >
        {investmentForm()}
      </Box>
      <form className={classes.root} noValidate autoComplete="off">
        {assetArray.map((asset) =>
          formElement(asset)
        )}
      </form>
      {dataFunctionForm()}
      <Box mt={4}>
      <Button
      variant="outlined"
      onClick={(e) => handleToolTipClick(showInfo)}
      >
        {showInfo ?  'Hide calculation': 'Show calculation'}
        </Button>
      {toolTip(assetArray, showInfo)}
      </Box>
    </div>
  );
};