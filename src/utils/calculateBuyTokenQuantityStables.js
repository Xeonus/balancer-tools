export function calculateBuyTokenQuantityStables(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee) {
    const copy = [...assetArray];

    let tokenInBalance = 0;
    let sumOfTokenBalances = 0;
    let productOfTokenBalances = 1;
    let ampCoefficient = 25
    // Amp Coeffecient = Amp Parameter / n ^ (n-1)
    // ampCoefficient = ampParameter / (copy.length ** (copy.length - 1))
    let swapFee = SwapFee/100;
    let invariant = 1;

    for (let i = 0; i < copy.length; i++) {
        tokenInBalance += copy[i].assetName === sellToken ? (Number(copy[i].assetBalance)) : (0);
        sumOfTokenBalances += copy[i].assetBalance * copy[i].rateProvider
        productOfTokenBalances *= copy[i].assetBalance * copy[i].rateProvider

    };

    for (let i = 0; i < copy.length; i++) {
        tokenOutBalance += copy[i].assetName === buyToken ? Number(copy[i].assetBalance) : (0);
        tokenOutWeight += copy[i].assetName === buyToken ? Number(copy[i].poolWeights/100) : (0);
    };
    
    let effectivePrice = Number((1/(1+swapFee)) * sellTokenQuantity / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1/(1+swapFee)) * sellTokenQuantity)))**(tokenInWeight/tokenOutWeight)))));
    let newBuyTokenQuantity = Number(sellTokenQuantity * (1/effectivePrice)).toFixed(6);

    //console.log(newBuyTokenQuantity);
    return newBuyTokenQuantity;
}