import { calculateILFromAssetArray } from "./calculateILFromAssetArray";

//Helper function to create an asset value table from assetArray
export function createTokenTableFromAssetArray(assetArray, investment, SwapFee) {

    //Mapper function to create rows
    function createData(assetName, initialTokens, tokensWithIL, tokensWithFees) {
        return { assetName, initialTokens, tokensWithIL, tokensWithFees};
      }

    //Local variables  
    const copy = [...assetArray];
    const impLoss = calculateILFromAssetArray(copy);
    let rows = [];
    let assetValueIfHeld = 0;
    let ilOfAsset = 0;

    //Data row creation
    for (let i = 0; i < copy.length; i++) {
        assetValueIfHeld = ( 1 + 1 * Number(copy[i].priceChange / 100)) * Number(copy[i].poolWeights) / 100 * investment;
        ilOfAsset = Number(assetValueIfHeld - assetValueIfHeld * (impLoss / 100)).toFixed(2);
        const tokenWithIL = Number(ilOfAsset / copy[i].exitPrice);
        const initialValue = copy[i].poolWeights / 100 * investment
        const initialToken = Number(initialValue / copy[i].entryPrice);
        const valueWithFees = Number((assetValueIfHeld - assetValueIfHeld * (impLoss / 100)) * (1 + SwapFee/100));
        const tokenWithFee = Number(valueWithFees / copy[i].exitPrice);
        const row = createData(copy[i].assetName, initialToken, tokenWithIL, tokenWithFee);
        rows.push(row);
    }
    return rows;
}