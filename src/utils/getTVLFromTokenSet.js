export default function getTVLFromTokenSet(gaugeArray, poolId, priceData) {
        let tvl = 0;
        gaugeArray.forEach( el => {
            if (el.poolId === poolId) {
                console.log("el", el);
                console.log("tokenAddress", el.tokenAddresses[0])
                console.log("price", priceData[el.tokenAddresses[0].toString()])
                el.tokenBalances.forEach((t) => 
                tvl += Number(t) * Number(priceData[el.tokenBalances.indexOf(t)])
        )}
        });
        return tvl;
    }