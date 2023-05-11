//Helper function to calculate PI based on an array of assets with different weights and balances
export function calculatePIFromAssetArray(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee) {
    const copy = [...assetArray];

    //Step 1: Search array for buy and sell token names and traits
    //Step 2: Calculate Spot Price
    //Step 3: Calculate Effective Price
    //Step 4: Price impact 

    let tokenInBalance = 0;
    let tokenInWeight = 0;
    let tokenOutBalance = 0;
    let tokenOutWeight = 0;
    let swapFee = SwapFee/100;

    for (let i = 0; i < copy.length; i++) {
        tokenInBalance += copy[i].assetName === sellToken ? (Number(copy[i].assetBalance)) : (0);
        tokenInWeight += copy[i].assetName === sellToken ? (Number(copy[i].poolWeights)/100) : (0);

    };

    for (let i = 0; i < copy.length; i++) {
        tokenOutBalance += copy[i].assetName === buyToken ? Number(copy[i].assetBalance) : (0);
        tokenOutWeight += copy[i].assetName === buyToken ? Number(copy[i].poolWeights/100) : (0);
    };
    
    let spotPrice = Number((tokenInBalance / tokenInWeight) / (tokenOutBalance / tokenOutWeight));
    let effectivePrice = Number((1*(1-swapFee)) * sellTokenQuantity / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1*(1-swapFee)) * sellTokenQuantity)))**(tokenInWeight/tokenOutWeight)))));
    let priceImpact = Number(((effectivePrice / spotPrice - 1) * 100));
    
    return priceImpact;
}