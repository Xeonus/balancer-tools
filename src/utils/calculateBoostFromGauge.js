//Helper function to calculate Boost for a certain gauge / veBAL configuration
export function calculateBoostFromGauge(newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare) {

    //console.log("vars: ", newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare)
    let boost = 0.0;
    //Calculate working supply:
    const liquidity_provided = Number(newShare) + Number(share);
    const supply_user = 0.4 * liquidity_provided + 0.6 * (Number(totalShare)) * ((Number(lockedVeBAL) + Number(newVeBAL)) / (Number(totalVeBALStaked) + Number(newVeBAL)));
    //Take the minimum of working supply limit and liquidity provided
    let working_supply_user = Number(Math.min(supply_user, liquidity_provided));
    //Non-boosted supply
    let non_boosted_working_supply_user = 0.4 * liquidity_provided;
    //Max working supply for 2.5x
    const max_working_supply_user = 0.40 * liquidity_provided + 0.60 * (Number(totalShare)) * (Number(newShare) / (Number(totalShare)));

    if (non_boosted_working_supply_user === 0) {
        non_boosted_working_supply_user = 0;
    }

    //console.log("supply_user", supply_user);
    //console.log("working_supply_user", working_supply_user);
    //console.log("non_boosted_working_supply", non_boosted_working_supply_user);
    //console.log("max_working_supply_user", max_working_supply_user)

    //Boost calculation depending 2 scenarios: new liquidity or already providing liquidity and adding more

    if (Number(newShare) === 0.0 && Number(newVeBAL) === 0.0) {
        //Case 1: current boost
        boost = (working_supply_user / Number(totalShare)) / ((0.4 * Number(share)) / (Number(totalShare) - working_supply_user + 0.4 * Number(share)))
        //console.log("case1 triggered")
    } else if (Number(share) !== 0.0 || Number(lockedVeBAL) !== 0.0) {
        //Case 2: user boost when adjusting current position (share !== 0)
        boost = (working_supply_user / (working_supply_user + Number(totalShare) - Number(share))) / ((non_boosted_working_supply_user) / (non_boosted_working_supply_user + Number(totalShare) - Number(share)));
        //console.log("case2 triggered")
    } else {
        //Case 3: user boost when entering (share = 0)
        boost = (working_supply_user / (working_supply_user + Number(totalShare))) / (non_boosted_working_supply_user / (non_boosted_working_supply_user + Number(totalShare)))
        //console.log("case3 triggered")
    }
    if (boost > 2.5) {
        boost = 2.5
    }

    //console.log("boost", boost);

    return boost;

}