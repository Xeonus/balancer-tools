export default function setAssetArrayFromPool (poolArray, poolId) {
    const array = poolArray.find(x => x.id === poolId)
    const assetArray = [];

    for (let i = 0; i < array.weights.length; i++) {
        const entry = {
            assetName: array.nameSet[i],
            assetBalance: Number(array.tvl / array.weights[i]),
            priceChange: 0,
            poolWeights: array.weights[i],
            entryPrice: 1000,
            exitPrice: 1000,
        }
        assetArray.push(entry);
      }
      return assetArray;
}