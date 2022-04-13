export default function getTotalSharesFromGauge(poolId, gaugeArray) {
    let totalShares = 0;
    gaugeArray.forEach( el => {
        if (el.poolId === poolId) {
            el.shares.forEach( e => {
                totalShares += Number(e.balance);
            });
        }
    });
    return totalShares;
}