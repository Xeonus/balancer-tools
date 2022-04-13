export default function getWorkingSupplyPoolInUsd(poolId, gaugeArray, working_supply) {
    let totalSupply = 0;
    gaugeArray.forEach( el => {
        if (el.poolId === poolId) {
            console.log("bptPrice", el.pricePerBPT);
            console.log("workingsupplyIn", working_supply)
            totalSupply = Number(el.pricePerBPT) * Number(working_supply);
        }
    });
    return totalSupply;
}