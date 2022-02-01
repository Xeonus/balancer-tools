export function calculateBuyTokenQuantity(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee) {
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
    
    let effectivePrice = Number((1/(1+swapFee)) * sellTokenQuantity / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1/(1+swapFee)) * sellTokenQuantity)))**(tokenInWeight/tokenOutWeight)))));
    let newBuyTokenQuantity = Number(sellTokenQuantity * (1/effectivePrice)).toFixed(6);

    console.log(newBuyTokenQuantity);
    return newBuyTokenQuantity;
}