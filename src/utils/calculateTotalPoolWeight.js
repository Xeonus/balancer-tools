//Helper function to calculate total of pool weights and display error for =/ 100%
export function calculateTotalPoolWeights(assetArray) {
    const copy = [...assetArray];
    let totalPoolWeights = 0;
    for (let i = 0; i < copy.length; i++) {
        totalPoolWeights += Number(copy[i].poolWeights) / 100;
    }
    //Round to 1 if percentage is very close to 1:
    if (totalPoolWeights >= Number(0.995)) {
        totalPoolWeights = Math.ceil(totalPoolWeights/1)*1
    }
    return totalPoolWeights;
}