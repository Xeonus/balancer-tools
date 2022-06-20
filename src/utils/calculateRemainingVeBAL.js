export function calculateRemainingVeBAL(newVeBAL, lockedVeBAL, totalVeBALStaked, newShare, share, totalShare, totalStakedLiquidity) {

    let remainingVeBAL = 0;
    const liquidity_provided = Number(newShare) + Number(share);
    // Calculate minveBAL for Max Boost
    let minveBAL = (totalVeBALStaked) * (liquidity_provided / ( Number(totalStakedLiquidity) + Number(newShare)));
    if (minveBAL > 50000000) {
        minveBAL = 0;
    }

    remainingVeBAL = minveBAL - newVeBAL - lockedVeBAL;

    if (remainingVeBAL < 0) {
         remainingVeBAL = 0;
    }

    return remainingVeBAL;
}