export default function getBALBPTPricePerPoolId(poolArray, poolId) {
    //Array is gaugeArray!
    let balSpotPrice = 0;
    poolArray.forEach(({id, tokenBalance, totalShares, weights}) => {
        if (poolId === id) {
            balSpotPrice = (tokenBalance[0] * (1 - (1 - 1/totalShares)**(1/(weights[0]/100))));
        }
        });
    return balSpotPrice;
}