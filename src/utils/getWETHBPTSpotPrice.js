export default function getWETHBPTPricePerPoolId(poolArray, poolId) {
    //Array is gaugeArray!
    let wethSpotPrice = 0;
    poolArray.forEach(({id, tokenBalance, totalShares, weights}) => {
        if (poolId === id) {
            wethSpotPrice = (tokenBalance[1] * (1 - (1 - 1/totalShares)**(1/(weights[1]/100))));
        }
        });
    return wethSpotPrice;
}