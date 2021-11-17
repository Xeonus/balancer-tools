//Helper function to calculate IL based on an array of assets with different weights and price changes
export function calculateILFromAssetArray(assetArray) {
    const copy = [...assetArray];
    //Step 1: calculate 'Value of Pool'
    let valueOfPool = 0;
    for (let i = 0; i < copy.length; i++) {
        valueOfPool *= (1+ 1 * Number(copy[i].priceChange / 100) ^ Number(copy[i].poolWeights)) / 100;
    }
    const entry = {
        assetName: 'X',
        priceChange: '0',
        poolWeights: '1',
    }
    copy.push(entry);
    return copy;
}