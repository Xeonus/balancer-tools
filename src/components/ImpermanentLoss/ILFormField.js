import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
    }
  }));

export default function ILFormField(){

    //Init styles
  const classes = useStyles();

    //Init asset array
    const assetArray = [];
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
        assetArray.push(entry);
      }


    //Form Change Handler (TODO)
    function handleChange(evt) {

    }

      const formElement = (element) => (
        <Box display="flexGrow">
        <TextField
          id={"asset" + element.assetName}
          label="Asset"
          multiline
          rowsMax={1}
          type="text"
          value={element.assetName}
          onChange={handleChange}
        />
        <TextField
          id={"pc" + element.priceChange}
          label="Price Change (%)"
          multiline
          rowsMax={1}
          type="number"
          value={element.priceChange}
          onChange={handleChange}
        />
        <TextField
          id={"weights" + element.poolWeights}
          label="Pool Weight"
          multiline
          rowsMax={1}
          type="number"
          value={element.poolWeights}
          onChange={handleChange}
        />
        </Box>
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