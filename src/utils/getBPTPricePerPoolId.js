export default function getBPTPricePerPoolId(poolArray, poolId) {
    //Array is gaugeArray!
    let bptPrice = 0;
    poolArray.forEach(({id, tvl, totalShares}) => {
        if (poolId === id) {
            bptPrice = Number(tvl / totalShares).toFixed(2);
        }
        });
    return bptPrice;
}