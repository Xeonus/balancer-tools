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
            swapFee: Number(array.swapFee),
            poolWeights: Number(array.weights[i]).toFixed(2),
            tokenDeposits: 100,
            entryPrice: 1000,
            exitPrice: 1000,
            totalShares: Number(array.totalShares)
        }
        assetArray.push(entry);
      }
      return assetArray;
    } else {
        return resetAssetArray();
    }
}