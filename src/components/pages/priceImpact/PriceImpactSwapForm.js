import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import { FormControl } from '@mui/material';
import { Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { myStyles } from '../../../styles/styles';
import { calculatePIFromAssetArray } from '../../../utils/calculatePIFromAssetArray';
import { addAssetToArray } from '../../../utils/addAssetToArray';
import { resetAssetArray } from '../../../utils/resetAssetArray';
import TextField from '@mui/material/TextField';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { networks } from "../../constants/networkConfigs";
import { IconButton } from '@mui/material';
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';
import Header from '../../UI/Header';
import DataTablePI from "./DataTablePI";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';
import PoolSelector from '../../UI/PoolSelector/PoolSelector';

//TODO: Implementation of price impact page

export default function PriceImpactSwapForm(props) {
    //Init styles    
    const classes = myStyles();

    //----------HOOKS and default states-----------
    const defaultArray = []
    const defaultAssetNames = ['BAL', 'WETH'];
    const defaultAssetBalance = [5000000, 7000]
    const defaultPoolWeights = [80, 20];
    let defaultSellToken = defaultAssetNames[0];
    let defaultBuyToken = defaultAssetNames[1];
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
    //Default tokens
    if (assetArray.length > 1) {
        defaultSellToken = assetArray[0].assetName;
        defaultBuyToken = assetArray[1].assetName;
    }
    const [sellToken, setSellToken] = React.useState(defaultSellToken);
    const [buyToken, setBuyToken] = React.useState(defaultBuyToken);
    const [SwapFee, setSwapFee] = React.useState(0.25);
    const [sellTokenQuantity, setSellTokenQuantity] = React.useState(1);
    const [buyTokenQuantity, setBuyTokenQuantity] = React.useState(1);
    
    const [poolId, setPoolId] = React.useState('');
    //Price impact value state hook
    const [calcPI, setCalcPI] = React.useState(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee));

    //Set active network
    const network = networks.find(x => x.id === props.networkId);
    //-------------------------

    //---------State Changes----------
    const handleSellChange = (event) => {
        //If asset array has size of 2, use a swap event
        if (assetArray.length === 2) {
            handleSellBuySwap()
        } else {
            setSellToken(event.target.value);
        }
    };
    const handleBuyChange = (event) => {
        //If asset array has size of 2, use a swap event
        if (assetArray.length === 2) {
            handleSellBuySwap()
        } else {
            setBuyToken(event.target.value);
        }
    };

    const handleSellBuySwap = () => {
        //Temp vars so state change doesn't overwrite itself?
        const newSellToken = buyToken;
        const newSellTokenQuantity = buyTokenQuantity;
        const newBuyTokenQuantity = sellTokenQuantity;
        const newBuyToken = sellToken;
        setSellToken(newSellToken);
        setSellTokenQuantity(newSellTokenQuantity);
        setBuyTokenQuantity(newBuyTokenQuantity);
        setBuyToken(newBuyToken)
    };

    const handleSellTokenQuantityChange = (event) => {
        setSellTokenQuantity(event.target.value);
        setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, event.target.value, buyToken, SwapFee));
    }

    const handleBuyTokenQuantityChange = (event) => {
        setBuyTokenQuantity(event.target.value);
        setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, event.target.value, buyToken, SwapFee));
    }


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
        setSellToken(newArray[0].assetName);
        setBuyToken(newArray[1].assetName);
        setCalcPI(calculatePIFromAssetArray(newArray, sellToken, sellTokenQuantity, buyToken, SwapFee));

    }

    const handleFeeChange = (event) => {
        setSwapFee(event.target.value);
        let clonedSwapFee = event.target.value;
        setCalcPI(calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, clonedSwapFee));
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
        setBuyToken(defaultAssetNames[1]);
        setSellToken(defaultAssetNames[0]);
        setCalcPI(calculatePIFromAssetArray(array, defaultAssetNames[0], sellTokenQuantity, defaultAssetNames[1], SwapFee));
    }
    //------------------------------------

    const sellMenuItems = assetArray.map(element =>
    (
        <MenuItem
            key={element.assetName + "swapSellForm"}
            value={element.assetName}
        >
            {element.assetName.toString()}
        </MenuItem>
    ));

    const buyMenuItems = assetArray.map(element =>
    (
        <MenuItem
            key={element.assetName + "swapBuyForm"}
            value={element.assetName}
        >
            {element.assetName.toString()}
        </MenuItem>
    ));

    //Swap Form
    const swapForm = () => (
        <Box display="flex" justifyContent="center" p={0.5} key={'swapForm'}>
        <Paper className={classes.form} variant="outlined" square>
        <Box display="flex" flexDirection="column" justifyContent="center">
                <Box><Typography>Swap Configuration</Typography> </Box>
                {/* SELL TOKEN*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        m: 1,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            m: 1,
                        }}>
                        <FormControl fullWidth>
                            <InputLabel id="sellToken">Sell</InputLabel>
                            <Select
                                labelId="sellToken"
                                id="demo-simple-select"
                                value={sellToken}
                                label="Sell"
                                autoWidth
                                onChange={handleSellChange}
                            >
                                {sellMenuItems}

                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        id="sellTokenQuantity"
                        label="Sell Token Quantity"
                        type="text"
                        value={(sellTokenQuantity)}
                        onChange={(e) => handleSellTokenQuantityChange(e)}
                        error={isNaN(sellTokenQuantity)}
                        helperText={isNaN(sellTokenQuantity) ? "Sell token quantity must be a number" : ""}
                    />
                </Box>
                <Box>
                <IconButton
                    onClick={handleSellBuySwap}
                >
                    <SwapVertIcon />
                </IconButton>
                </Box>
                {/* BUY TOKEN*/}
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'center',
                        m: 1,
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'center',
                            m: 1,
                        }}>
                        <FormControl fullWidth>
                            <InputLabel id="buyToken">Buy</InputLabel>
                            <Select
                                labelId="buyToken"
                                id="demo-simple-select"
                                value={buyToken}
                                label="Buy"
                                autowidth
                                onChange={handleBuyChange}
                            >
                                {buyMenuItems}

                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        id="sellTokenQuantity"
                        label="Buy Token Quantity"
                        type="text"
                        value={(buyTokenQuantity)}
                        onChange={(e) => handleBuyTokenQuantityChange(e)}
                        error={isNaN(buyTokenQuantity)}
                        helperText={isNaN(buyTokenQuantity) ? "Buy token quantity must be a number" : ""}
                    />
                </Box>
                <Box p={1}>
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
            
        </Box>
        </Paper>
        </Box>
    );

    //TODO: Refactor into own component?
    const formElement = (element, id) => (
        <Box display="flex" justifyContent="center" p={0.5} key={'formField' + id}>
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


    return (
        <div>
            <PoolSelector network={network} poolId={poolId} onChange={handleIdChange}></PoolSelector>
            {swapForm()}
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
        </div >
    );
}