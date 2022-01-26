import React from "react";
import { myStyles } from "../../../styles/styles";
import Header from '../../UI/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import DataTablePI from "./DataTablePI";
import PoolSelector from "../../UI/PoolSelector/PoolSelector";
import { networks } from "../../constants/networkConfigs";
import { calculatePIFromAssetArray } from '../../../utils/calculatePIFromAssetArray';
import { addAssetToArray } from "../../../utils/addAssetToArray";
import { resetAssetArray } from "../../../utils/resetAssetArray";
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import SwapForm from "./PriceImpactSwapForm";

export default function PriceImpactFormField (props) {

  //Init styles    
  const classes = myStyles();

  //Init asset array
  const defaultArray = []
  const defaultAssetNames = ['BAL', 'WETH'];
  const defaultAssetBalance = [5000000, 7000]
  const defaultPoolWeights = [80, 20];


  //Default init with 3 Assets
  for (let i = 0; i < defaultAssetNames.length; i++) {
    const entry = {
      assetName: defaultAssetNames[i],
      assetBalance: defaultAssetBalance[i],
      poolWeights: defaultPoolWeights[i],
    }
    defaultArray.push(entry);
  }

  //Asset array state hook
  const [assetArray, setAssetArray] = React.useState(defaultArray);
  const [poolId, setPoolId] = React.useState('');

  //Set active network
  const network = networks.find(x => x.id === props.networkId);

  //Swap Fee hook TODO: Xeonus input / OK for now -> redux in the future?
  const [SwapFee, setSwapFee] = React.useState(0.25);

  //Sets sell token or token in 
  const [sellToken, setSellToken] = React.useState("WETH");

  //Sets buy token or token out 
  const [buyToken, setBuyToken] = React.useState("BAL");

  //Sets sell token or token in 
  const [sellTokenQuantity, setSellTokenQuantity] = React.useState(1);

  //Sets buy token or token out quantity
  const [buyTokenQuantity, setBuyTokenQuantity] = React.useState(100);

  //Price impact value state hook
  const [calcPI, setCalcPI] = React.useState(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));

  //Form Element state change handler
  const handleChange = (event, element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData[index][event.target.id] = event.target.value;
    setAssetArray(clonedData);
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  function handleIdChange(newId, newArray) {
    setPoolId(newId);
    setAssetArray(newArray);
    setSellToken(assetArray[0].assetName);
    setBuyToken(assetArray[1].assetName);
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));

  }

  //const errorTotalPoolWeights = (calculateTotalPoolWeights(assetArray) === 1 ? "" : "Total of pool weights must equal 100%");

  const handleFeeChange = (event) => {
    setSwapFee(event.target.value);
    let clonedSwapFee = event.target.value;
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, clonedSwapFee));
  }

  const handleSellTokenChange = (event) => {
    setSellToken(event.target.value);
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  const handleBuyTokenChange = (event) => {
    setBuyToken(event.target.value);
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  const handleSellTokenQuantityChange = (event) => {
    setSellTokenQuantity(event.target.value);
    let clonedSellTokenQuantity = event.target.value;
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, clonedSellTokenQuantity, buyToken, SwapFee));
  }

  const handleBuyTokenQuantityChange = (event) => {
    setBuyTokenQuantity(event.target.value);
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  //Remove entry
  const handleRemoveClick = (e, el) => {
    const index = assetArray.indexOf(el);
    const clonedData = [...assetArray];
    clonedData.splice(index, 1);
    setAssetArray(clonedData);
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  //Add entry
  const handleAddClick = (array) => {
    setAssetArray(addAssetToArray(array));
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  //Reset data array
  const handleResetClick = (array) => {
    setAssetArray(resetAssetArray(array));
    setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));
  }

  const poolSwapForm = () => (
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
            id="sellToken"
            label="Sell Token"
            type="text"
            value={(sellToken)}
            onChange={(e) => handleSellTokenChange(e)}
          />
          <TextField
            id="sellTokenQuantity"
            label="Sell Token Quantity"
            type="text"
            value={(sellTokenQuantity)}
            onChange={(e) => handleSellTokenQuantityChange(e)}
            error={isNaN(sellTokenQuantity)}
            helperText={isNaN(sellTokenQuantity) ? "Sell token quantity must be a number" : ""}
          />
          <TextField
            id="buyToken"
            label="Buy Token"
            type="text"
            value={(buyToken)}
            onChange={(e) => handleBuyTokenChange(e)}
          />
          <TextField
            id="buyTokenQuantity"
            label="Buy Token Quantity"
            type="text"
            value={(buyTokenQuantity)}
            onChange={(e) => handleBuyTokenQuantityChange(e)}
            error={isNaN(buyTokenQuantity)}
            helperText={isNaN(buyTokenQuantity) ? "Buy token quantity must be a number" : ""}
          />
          <TextField
            id="SwapFee"
            label="Swap Fee (%)"
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
            id="assetBalance"
            label="Token Balance"
            multiline
            size="small"
            type="number"
            value={element.assetBalance}
            onChange={(e) => handleChange(e, element)}
            error={isNaN(element.assetBalance)}
            helperText={isNaN(element.assetBalance) ? "Token Balance must be a number" : ""}
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
    )

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

  const dataTablePI = (assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee) => (
    <Box display="flex" justifyContent="center" mb={2}>
      <Paper className={classes.form} variant="outlined" square>
        <DataTablePI assetArray={assetArray} sellToken={sellToken} sellTokenQuantity={sellTokenQuantity} buyToken={buyToken} SwapFee={SwapFee}></DataTablePI>
      </Paper>
    </Box>
  )

  return(
    <div>
      
      <PoolSelector network={network} poolId={poolId} onChange={handleIdChange}></PoolSelector>
    <SwapForm assetArray={assetArray}></SwapForm>
    <form className={classes.root} noValidate autoComplete="off">
     {poolSwapForm()}
    </form>
    <form className={classes.root} noValidate autoComplete="off">
     {assetArray.map((asset) =>
     formElement(asset, asset.assetName)
     )}
    </form>
    {dataFunctionForm()}
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        p: 2,
      }}>
    <Paper className={classes.resultPaper} variant="outlined" square >
          <Header>
            Price Impact = {<DynamicValueFormatter value={Number(calcPI).toFixed(4)} name={'piValue'} decimals={4} />} %
          </Header>
          {dataTablePI(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee)}
        </Paper>
      </Box>
   </div>
  )
}