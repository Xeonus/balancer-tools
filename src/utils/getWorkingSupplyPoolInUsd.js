export default function getWorkingSupplyPoolInUsd(poolId, gaugeArray, working_supply) {
    let totalSupply = 0;
    gaugeArray.forEach( el => {
        if (el.poolId === poolId) {
            totalSupply = Number(el.pricePerBPT) * Number(working_supply);
        }
    });
    return totalSupply;
}