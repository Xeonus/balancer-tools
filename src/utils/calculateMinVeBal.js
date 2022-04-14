//Helper function to calculate minimum veBAL for Max Boost for a certain gauge / veBAL configuration
export function calculateMinVeBAL(newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare, totalStakedLiquidity) {

    //Calculate working supply:
    const liquidity_provided = Number(newShare) + Number(share);
    // Calculate minveBAL for Max Boost
    let minveBAL = (totalVeBALStaked) * (liquidity_provided / ( Number(totalShare)));


    console.log("cows", minveBAL);

    return minveBAL;

}