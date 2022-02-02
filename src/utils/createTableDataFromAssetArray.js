//import { calculateILFromAssetArray } from "./calculateILFromAssetArray";

//Helper function to create an asset value table from assetArray
export function createTableDataFromAssetArray(assetArray, investment, SwapFee) {

    //Mapper function to create rows
    function createData(assetName, initialValue, valueIfHeld, valueWithIL, valueWithFees) {
        return { assetName, initialValue, valueIfHeld, valueWithIL, valueWithFees};
      }

    //Local variables  
    const copy = [...assetArray];
    //const impLoss = calculateILFromAssetArray(copy);
    let rows = [];
    let assetValueIfHeld = 0;
    let ilOfAsset = 0;

    let initialInvariant =  1
    for (let i = 0; i < copy.length; i++) {
        initialInvariant *= ( 1 ) ** (Number(copy[i].poolWeights) / 100);
    };

    let newInvariant = 1
    for (let j = 0; j < copy.length; j++) {
        newInvariant *= ( 1 + Number(copy[j].priceChange / 100)) ** (Number(copy[j].poolWeights) / 100);
    };

    let invariantRatio = Number(newInvariant / initialInvariant); 

    //Data row creation
    for (let i = 0; i < copy.length; i++) {
        assetValueIfHeld = ( 1 + 1 * Number(copy[i].priceChange / 100)) * Number(copy[i].poolWeights) / 100 * investment;
        const initialValue = copy[i].poolWeights / 100 * investment
        ilOfAsset = Number(assetValueIfHeld * (invariantRatio/(1 + copy[i].priceChange / 100))).toFixed(2);
        const valueWithFees = Number(assetValueIfHeld * (invariantRatio/(1 + copy[i].priceChange / 100)) * (1 + SwapFee/100));
        const row = createData(copy[i].assetName, initialValue, assetValueIfHeld, ilOfAsset, valueWithFees);
        rows.push(row);
    }
    return rows;
}