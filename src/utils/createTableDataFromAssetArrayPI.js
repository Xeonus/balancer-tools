//Helper function to create an asset value table from assetArray
export function createTableDataFromAssetArrayPI(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee) {
    const copy = [...assetArray];

    //Mapper function to create rows
    function createDataPI(assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee) {
        return { assetArray, sellToken, sellTokenQuantity, buyToken, SwapFee };
      }

    //Initializing and adjusting varibales
    let tokenInBalance = 0;
    let tokenInWeight = 0;
    let tokenOutBalance = 0;
    let tokenOutWeight = 0;
    let swapFee = SwapFee/100;
    let data = [];

    //Looping to get total weight and token balance of sell token
    for (let i = 0; i < copy.length; i++) {
        tokenInBalance += copy[i].assetName === sellToken ? (Number(copy[i].assetBalance)) : (0);
        tokenInWeight += copy[i].assetName === sellToken ? (Number(copy[i].poolWeights)/100) : (0);

    };

    //Looping to get total weight and token balance of buy token
    for (let i = 0; i < copy.length; i++) {
        tokenOutBalance += copy[i].assetName === buyToken ? Number(copy[i].assetBalance) : (0);
        tokenOutWeight += copy[i].assetName === buyToken ? Number(copy[i].poolWeights/100) : (0);
    };
    
    //Defines spot and effective price and calculates price impact
    let tokenPair = buyToken + " / " + sellToken
    let spotPrice = Number((tokenInBalance / tokenInWeight) / (tokenOutBalance / tokenOutWeight));
    let effectivePrice = Number((1/(1+swapFee)) * sellTokenQuantity / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1/(1+swapFee)) * sellTokenQuantity)))**(tokenInWeight/tokenOutWeight)))));
    let tokensWithoutPI = spotPrice * sellTokenQuantity 
    let tokensWithPI = effectivePrice * sellTokenQuantity
    let info = createDataPI(tokenPair, spotPrice, effectivePrice, tokensWithoutPI, tokensWithPI);
    data.push(info);

    return data;

}