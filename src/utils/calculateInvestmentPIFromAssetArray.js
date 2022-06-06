
//Helper function to calculate PI based on an array of assets with different weights and balances
export function calculateInvestmentPIFromAssetArray(assetArray, SwapFee) {

    const copy = [...assetArray];
    //Step 1: Define each variable relavent to the token to BPT array
    //Step 2: Calculate Spot Price, net single deposit, and taxable amount of BPT
    //Step 3: Calculate Invariant ratio after taxed value of tokens is converted to BPT
    //Step 4: Calculate BPT Out, ratio to the totalSpotBPT to determine Price impact 

    let bptArray = [];
    let bptSpotPrice = 0;
    let totalPoolTokens = Number(copy[0].totalShares);
    let tokenSpotBPT = 0;
    let totalSpotBPT = 0;
    let swapFee = SwapFee/100;
    let invariantRatio = 1;

    for (let i = 0; i <copy.length; i++) {
      bptSpotPrice = isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100))));
      tokenSpotBPT = bptSpotPrice * copy[i].tokenDeposits;
      totalSpotBPT += tokenSpotBPT
    }

      for (let i = 0; i < copy.length; i++) {
        bptSpotPrice = isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100))));
        tokenSpotBPT = bptSpotPrice * copy[i].tokenDeposits;
        const investEntry = {
          depositAmount: Number(copy[i].tokenDeposits),
          bptSpotPrice: isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100)))),
          tokenSpotBPT: bptSpotPrice * copy[i].tokenDeposits,
          proportionalEntry: totalSpotBPT * copy[i].poolWeights/100,
          netSingleDepost: bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0,
          depositImpact: isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits),
          newTokenBalance: Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits))),
          tokenInvariantRatio: ((Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits)))) ** (copy[i].poolWeights/100)) / (copy[i].assetBalance ** (copy[i].poolWeights/100))
        }
        
        bptArray.push(investEntry)
      };

        for (let j=0; j < bptArray.length; j++) {
          invariantRatio *= bptArray[j].tokenInvariantRatio
          };

    let bptOut = (invariantRatio - 1) * totalPoolTokens
    let investmentPriceImpact = (1 - bptOut / totalSpotBPT) * 100
    let investmentOutcomes = [bptOut, investmentPriceImpact]
  return investmentOutcomes;
}