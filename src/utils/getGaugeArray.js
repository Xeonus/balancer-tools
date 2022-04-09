import { getGaugeData } from "../components/data/queries/operations";

export default function getGaugeArray(data) {
    //Obtain gauge data from gauge subgraph
    let gaugeArray = [];
    //total veBAL staked:
    const totalStaked = data.votingEscrows[0].stakedSupply;
    data.liquidityGauges.forEach(({ poolAddress, poolId, symbol, totalSupply}) => {

        let gaugeEntry = {
            poolAddress: poolAddress,
            poolId: poolId,
            name: symbol,
            totalStaked: totalSupply,
        }
            if (gaugeEntry.totalStaked > 0) {
            gaugeArray.push(gaugeEntry);
            }
        });
    //sort by totalStake
    gaugeArray.sort((a, b) => (b.totalSupply - a.totalSupply)); 
    return [gaugeArray, totalStaked];
}