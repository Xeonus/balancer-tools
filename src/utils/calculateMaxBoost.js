//Helper function to calculate Max Boost for a certain gauge / veBAL configuration
export function calculateMaxBoost(newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare, totalStakedLiquidity) {

    //console.log("vars: ", newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare)
    let max_boost = 0.0;
    //Calculate working supply:
    const liquidity_provided = Number(newShare) + Number(share);
    // Calculate minveBAL for Max Boost
    let minveBAL = (totalVeBALStaked) * (liquidity_provided / ( Number(totalShare)));
    //const working_supply_pool = Number(totalShare);
    const supply_user_max = 0.4 * liquidity_provided + 0.6 * (Number(totalStakedLiquidity)) * (minveBAL) / (Number(totalVeBALStaked));
    //Take the minimum of working supply limit and liquidity provided
    let working_supply_user_max = Number(Math.min(supply_user_max, liquidity_provided));
    //Non-boosted supply
    let non_boosted_working_supply_user = 0.4 * liquidity_provided;
    //Max working supply for 2.5x
    //const max_working_supply_user = 0.40 * liquidity_provided + 0.60 * (Number(totalStakedLiquidity)) * (Number(newShare) / (Number(totalShare)));
    //Boost calculation depending 2 scenarios: new liquidity or already providing liquidity and adding more

    if (Number(newShare) === 0.0 && Number(newVeBAL) === 0.0) {
        //Case 1: current boost
        max_boost = (working_supply_user_max / Number(totalShare)) / ((0.4 * Number(share)) / (Number(totalShare) - working_supply_user_max + 0.4 * Number(share)))
        //console.log("case1 triggered")
    } else if (Number(share) !== 0.0 || Number(lockedVeBAL) !== 0.0) {
        //Case 2: user boost when adjusting current position (share !== 0)
        max_boost = (working_supply_user_max / (working_supply_user_max + Number(totalShare) - Number(share))) / ((non_boosted_working_supply_user) / (non_boosted_working_supply_user + Number(totalShare) - Number(share)));
        //console.log("case2 triggered")
    } else {
        //Case 3: user boost when entering (share = 0)
        max_boost = (working_supply_user_max / (working_supply_user_max + Number(totalShare))) / (non_boosted_working_supply_user / (non_boosted_working_supply_user + Number(totalShare)))
        //console.log("case3 triggered")
    }
    if (max_boost > 2.5) {
        max_boost = 2.5
    } else if (max_boost < 1) {
        max_boost = 1.0
    }

    // console.log("max_boost", max_boost);

    return max_boost;

}