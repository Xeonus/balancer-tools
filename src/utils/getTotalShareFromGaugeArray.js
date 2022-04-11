export default function getTotalShareFromGaugeArray(poolId, gaugeArray) {
    let totalSupply = 0;
    gaugeArray.forEach( el => {
        if (el.poolId === poolId) {
            totalSupply = el.totalStakedUSD;
        }
    });
    return totalSupply;
}