import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

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
        justifyContent: 'center',
        color: '#3F3351',
        borderRadius: "22px",
    },
  }));

export default function ILFormField(){

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

  //Form Element state change handler
  const handleChange = (event, element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData[index][event.target.id] = event.target.value;
    setAssetArray(clonedData);
    console.log("handleChange", event.target.value)
  };

  //Remove entry button
  const handleRemoveClick = (element) => {
    const index = assetArray.indexOf(element);
    const clonedData = [...assetArray];
    clonedData.splice(index, 1);
    setAssetArray(clonedData);
  }

      const formElement = (element) => (
        <Paper elevation={3} className={classes.paper}>
        <Box display="flexGrow">
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
        onClick={(e) => handleRemoveClick(e, element)}
        >
         Remove   
        </Button>
        </Box>
        </Paper>
      );

    return(
        <div>
        <Box m={2}>
        <Typography variant="h6" gutterBottom color="primary" component="span">
          IL Calculator POC
        </Typography>
      </Box>
        <form className={classes.root} noValidate autoComplete="off">
        {assetArray.map((asset) => 
            formElement(asset)
        )}
        
        
        </form>
        </div>
    );
}