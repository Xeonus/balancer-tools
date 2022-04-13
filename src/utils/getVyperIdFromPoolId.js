export default function getVyperIdFromPoolId(poolId, gaugeArray) {
    let vyperId = 0;
    gaugeArray.forEach( el => {
        if (el.poolId === poolId) {
            vyperId = el.id;
        }
    });
    return vyperId;
}