export default function getGaugeArrayTokenSet(poolId, gaugeArray) {
    let tokenSet = '';
    gaugeArray.forEach( el => {
        if (el.poolId === poolId && el.tokenAddresses) {
            el.tokenAddresses.map(el => tokenSet += el + '%2C');
        }
    });
    return tokenSet;
}