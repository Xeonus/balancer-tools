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
            const poolName = tokenNames + ratios;
            let weightArray = [];
            tokens.map(e => weightArray.push(Number(e.weight * 100)));
            let poolEntry = {
                weights: weightArray,
                poolName: poolName,
                url: balancerUrl.concat(id),
                tvl: Number(totalLiquidity),
            }
            poolArray.push(poolEntry);
        }
    });
    return poolArray;
}