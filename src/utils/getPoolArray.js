export default function getPoolArray(data) {


    //TODOs: ENUMs for base URL
    //Thinking about data structure more deeply, probably overengineered. fetching graph -> sorting -> sorting for visualization too much?
    //Balancer URL:
    const balancerUrl = 'https://app.balancer.fi/#/pool/';
    //Obtain sorted array of pool data
    let poolArray = [];
    data.balancers[0].pools.forEach(({ id, tokens, totalLiquidity, poolType }) => {

        if (poolType === "Weighted") {
            const ratios = " (" + tokens.map(e => Number(e.weight * 100).toFixed(0)).join('/') + ")";
            const tokenNames = tokens.map(e => e.symbol ? e.symbol : "MKR").join('/')
            const nameSet = [];
            tokens.map(e => nameSet.push(e.symbol ? e.symbol : "MKR"))
            const poolName = tokenNames + ratios;
            let weightArray = [];
            tokens.map(e => weightArray.push(Number(e.weight * 100)));
            let tokenBalance = [];
            tokens.map(e => tokenBalance.push(Number(e.balance).toFixed(2)));
            let poolEntry = {
                id: id,
                weights: weightArray,
                poolName: poolName,
                nameSet: nameSet,
                url: balancerUrl.concat(id),
                tokenBalance: tokenBalance,
                tvl: Number(totalLiquidity).toFixed(2),
            }
            if (poolEntry.tvl > 100) {
            poolArray.push(poolEntry);
            }
        }
    });
    return poolArray;
}