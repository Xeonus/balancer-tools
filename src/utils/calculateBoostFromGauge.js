//Helper function to calculate Boost for a certain gauge / veBAL configuration
export function calculateBoostFromGauge(lockedVeBAL, totalVeBALStaked, share, totalShare) {
    let boost = (0.40 * Number(share).toFixed(2) + (0.60 * Number(totalShare).toFixed(2) * (Number(lockedVeBAL).toFixed(2) / Number(totalVeBALStaked).toFixed(2))))/(0.4 * Number(share).toFixed(2))
    console.log("boost share", share);
    if (boost > 2.50) {
        boost = 2.50;
    }
    return boost;
}