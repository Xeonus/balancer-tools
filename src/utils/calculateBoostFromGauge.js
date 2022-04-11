//Helper function to calculate Boost for a certain gauge / veBAL configuration
export function calculateBoostFromGauge(newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare) {
    //Legacy formula
    {/*
    let boost = (0.40 * Number(share).toFixed(2) + (0.60 * Number(totalShare).toFixed(2) * (Number(lockedVeBAL).toFixed(2) / Number(totalVeBALStaked).toFixed(2))))/(0.4 * Number(share).toFixed(2))
    if (boost > 2.50) {
        boost = 2.50;
    }
    return boost;
*/}
    let boost = 0;

    //Calculate working supply:
    let working_supply = share;
    let working_supply_user = 0.40 * newShare + 0.60 * (share + newShare) * lockedVeBAL / totalVeBALStaked;
    //Take the minimum of working supply limit and liquidity provided
    if (working_supply < working_supply_user) {
        working_supply_user = working_supply;
    }
    

    return boost;

}