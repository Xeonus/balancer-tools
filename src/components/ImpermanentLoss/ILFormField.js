import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { addAssetToArray } from '../../utils/addAssetToArray';
import { resetAssetArray } from '../../utils/resetAssetArray';
import { calculateILFromAssetArray } from '../../utils/calculateILFromAssetArray';
import DynamicValueFormatter from '../UI/DynamicValueFormatter';
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
  paper: {
    '@media only screen and (min-width: 600px)': {
      padding: theme.spacing(1),
    },
    minWidth: 'auto',
    textAlign: 'center',
    align: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#35384a',
    borderRadius: "10px",
    margin: '10px'
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

export default function ILFormField() {

  //Init styles
  const classes = useStyles();

  //Init asset array
  const defaultArray = []
  const defaultAssetNames = ['BAL', 'WBTC', 'WETH'];
  const defaultPriceChange = ['400', '150', '400'];
  const defaultPoolWeights = ['50', '34', '16'];

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

  //Form Element state change handler
  const handleChange = (event, element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData[index][event.target.id] = event.target.value;
    setAssetArray(clonedData);
    setCalcIL(calculateILFromAssetArray(clonedData));
  };

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

  const formElement = (element) => (
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
          id="assetName"
          label="Asset"
          multiline
          rowsMax={1}
          type="text"
          value={element.assetName}
          onChange={(e) => handleChange(e, element)}
        />
        <TextField
          id="priceChange"
          label="Price Change (%)"
          multiline
          rowsMax={1}
          type="number"
          value={element.priceChange}
          onChange={(e) => handleChange(e, element)}
        />
        <TextField
          id="poolWeights"
          label="Pool Weight"
          multiline
          rowsMax={1}
          type="number"
          value={element.poolWeights}
          onChange={(e) => handleChange(e, element)}
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
  );

  //Form components to add elements or reset the array
  const dataFunctionForm = () => (
    <Box display="flex" justifyContent="center" sx={{ mr: 2 }}>
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

  return (
    <div>
      <Box m={2}>
        <Typography variant="h6" gutterBottom color="primary" component="span">
          IL Calculator POC
        </Typography>
      </Box>
      <Box m={2}>
      
        <Typography variant="h6" gutterBottom color="primary" component="span">
          IL = {<DynamicValueFormatter value={Number(calcIL).toFixed(2)} name={'iLValue'} decimals={2} />} %
        </Typography>
      </Box>
      <form className={classes.root} noValidate autoComplete="off">
        {assetArray.map((asset) =>
          formElement(asset)
        )}
      </form>
      {dataFunctionForm()}
    </div>
  );
}