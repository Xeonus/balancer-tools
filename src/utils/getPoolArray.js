export default function getPoolArray(data) {


    //TODOs: ENUMs for base URL
    //Thinking about data structure more deeply, probably overengineered. fetching graph -> sorting -> sorting for visualization too much?
    //Balancer URL:
    const balancerUrl = 'https://app.balancer.fi/#/pool/';
    //Obtain sorted array of pool data
    let poolArray = [];
    data.balancers[0].pools.forEach(({ id, tokens, totalLiquidity, totalShares, poolType, name, swapFee}) => {
        if (poolType === "Weighted" || poolType === "ComposableStable" || poolType === "MetaStable" || poolType === "Stable" || poolType === "StablePhantom" || poolType === "Element") {
            let poolName = '';
            let ratios = " (" + tokens.map(e => Number(e.weight * 100).toFixed(0)).join('/') + ")";
            const tokenNames = tokens.map(e => e.symbol ? e.symbol : "MKR").join('/');
            const tokenAddresses = tokens.map(e => e.address);
            const nameSet = [];
            poolName = tokenNames + ratios;
            tokens.map(e => nameSet.push(e.symbol ? e.symbol : "MKR"))
            let weightArray = [];
            if (poolType === "MetaStable" || poolType === 'ComposableStable' || poolType === "Stable" || poolType === "StablePhantom" || poolType === "Element") {
                tokens.map( e => weightArray.push(Number( 100 / nameSet.length)));
                //overwrite Ratios:
                //ratios = " (" + tokens.map(e => Number( 100 / nameSet.length).toFixed(0)).join('/') + ")"
                poolName = tokenNames;
            }
            else {
            tokens.map(e => weightArray.push(Number(e.weight * 100)));
            }
            //poolName = tokenNames + ratios;
            let tokenBalance = [];
            tokens.map(e => tokenBalance.push(Number(e.balance).toFixed(2)));
            let poolEntry = {
                id: id,
                weights: weightArray,
                poolName: poolName,
                swapFee: swapFee,
                shortName: name,
                nameSet: nameSet,
                url: balancerUrl.concat(id),
                tokenBalance: tokenBalance,
                tokenAddresses: tokenAddresses,
                tvl: Number(totalLiquidity).toFixed(2),
                totalShares: Number(totalShares).toFixed(2),
            }
            if (poolEntry.totalShares > 0) {
            poolArray.push(poolEntry);
            }
        }
    });
    //sort by TVL
    poolArray.sort((a, b) => (b.tvl - a.tvl)); 
    return poolArray;
}