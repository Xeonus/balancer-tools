export function calculateSellTokenQuantity(assetArray, sellToken, buyTokenQuantity, buyToken, SwapFee) {
    const copy = [...assetArray];

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
    
    let effectivePrice = Number((tokenInBalance * (((tokenOutBalance / (tokenOutBalance - ((1/(1+swapFee)) * buyTokenQuantity)))**(tokenOutWeight/tokenInWeight))-1)) / buyTokenQuantity);
    let newSellTokenQuantity = Number(buyTokenQuantity * effectivePrice).toFixed(6);

    console.log(newSellTokenQuantity);
    return newSellTokenQuantity;

}