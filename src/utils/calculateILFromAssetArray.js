//Helper function to calculate IL based on an array of assets with different weights and price changes
export function calculateILFromAssetArray(assetArray) {
    const copy = [...assetArray];
    //Step 1: calculate 'Value of Pool'
    //Step 2: calculate 'Asset Value if held'
    let valueOfPool = 1;
    let assetValueIfHeld = 0;
    for (let i = 0; i < copy.length; i++) {
        valueOfPool *= ( 1 + 1 * Number(copy[i].priceChange / 100)) ** (Number(copy[i].poolWeights) / 100);
        assetValueIfHeld += ( 1 + 1 * Number(copy[i].priceChange / 100)) * Number(copy[i].poolWeights) / 100;
    }
    console.log("IL", ((valueOfPool / assetValueIfHeld) - 1) * 100);
    let impermanentLoss = ((valueOfPool / assetValueIfHeld) - 1) * 100;
    if (impermanentLoss < 0) {
        impermanentLoss *= -1;
    }
    return impermanentLoss;
}