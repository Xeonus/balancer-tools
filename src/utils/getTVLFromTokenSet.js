export default function getTVLFromTokenSet(gaugeArray, poolId, priceData) {
        let tvl = 0;
        gaugeArray.forEach( el => {
            if (el.poolId === poolId) {
                for (let i = 0; i < el.tokenBalances.length; ++i) {
                    if (priceData[el.tokenAddresses[i]] && priceData[el.tokenAddresses[i]].usd) {
                    tvl += Number(el.tokenBalances[i]) * Number(priceData[el.tokenAddresses[i]].usd);
                    }
                }
        }});
        return tvl;
    }