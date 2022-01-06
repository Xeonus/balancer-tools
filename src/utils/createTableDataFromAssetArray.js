import { calculateILFromAssetArray } from "./calculateILFromAssetArray";

//Helper function to create an asset value table from assetArray
export function createTableDataFromAssetArray(assetArray, investment, SwapFee) {

    //Mapper function to create rows
    function createData(assetName, initialValue, valueIfHeld, valueWithIL, valueWithFees) {
        return { assetName, initialValue, valueIfHeld, valueWithIL, valueWithFees};
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
        const initialValue = copy[i].poolWeights / 100 * investment
        const valueWithFees = Number((assetValueIfHeld - assetValueIfHeld * (impLoss / 100)) * (1 + SwapFee/100));
        const row = createData(copy[i].assetName, initialValue, assetValueIfHeld, ilOfAsset, valueWithFees);
        rows.push(row);
    }
    return rows;
}