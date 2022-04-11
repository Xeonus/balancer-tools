//Helper function to calculate Boost for a certain gauge / veBAL configuration
export function calculateBoostFromGauge(newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare) {

    console.log("vars: ", newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare)
    let boost = 0.0;
    //Calculate working supply:
    const liquidity_provided = Number(share);
    const supply_user = 0.4 * Number(newShare) + 0.6 * (Number(newShare) + Number(totalShare)) * (Number(lockedVeBAL) / (Number(totalVeBALStaked) + Number(newVeBAL)));
    //Take the minimum of working supply limit and liquidity provided
    let working_supply_user = Number(Math.min(supply_user, liquidity_provided));
    //Non-boosted supply
    const non_boosted_working_supply_user = 0.4 * Number(newShare);

    console.log("supply_user", supply_user);
    console.log("working_supply_user", working_supply_user);
    console.log("non_boosted_working_supply", non_boosted_working_supply_user);

    //Boost calculation depending 2 scenarios: new liquidity or already providing liquidity and adding more
    if (Number(share) !== 0.0 && Number(lockedVeBAL) !== 0.0) {
         //Case 1: user boost when adjusting current position (share !== 0)
         boost = (working_supply_user / (working_supply_user + Number(totalShare) - Number(share))) / ((non_boosted_working_supply_user) / (non_boosted_working_supply_user + Number(totalShare) - Number(share)));
         console.log("case1 triggered")
    } else {
        //Case 2: user boost when entering (share = 0)
        boost = (working_supply_user / (working_supply_user + Number(totalShare))) / (non_boosted_working_supply_user / (non_boosted_working_supply_user + Number(totalShare)))
        console.log("case2 triggered")
       
    }
    if (boost > 2.5) {
        boost = 2.5
    }

    console.log("boost", boost);

    return boost;

}