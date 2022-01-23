import { resetAssetArray } from "./resetAssetArray";

//Set assetArray based on chosen pool configuration. If now poolId is persisted, init with defaultArray
export default function setAssetArrayFromPool (poolArray, poolId) {
    
    const array = poolArray.find(x => x.id === poolId)
    const assetArray = [];
    if (poolId && array) {
    for (let i = 0; i < array.weights.length; i++) {
        const entry = {
            assetName: array.nameSet[i],
            assetBalance: Number(array.tokenBalance[i]),
            priceChange: 0,
            poolWeights: array.weights[i],
            entryPrice: 1000,
            exitPrice: 1000,
        }
        assetArray.push(entry);
      }
      return assetArray;
    } else {
        return resetAssetArray();
    }
}