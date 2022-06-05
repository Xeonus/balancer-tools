//Helper function to create an asset value table from assetArray
export function createTableDataFromAssetArrayInvestmentPI(assetArray, SwapFee) {
  
    const copy = [...assetArray];

    //Initializing and adjusting varibales
    let bptArray = [];
    let bptSpotPrice = 0;
    let totalPoolTokens = isNaN(copy[0].totalShares) ? 2000000 : Number(copy[0].totalShares);
    let tokenSpotBPT = 0;
    let totalSpotBPT = 0;
    let swapFee = SwapFee/100;

    //Looping to get total weight and token balance of sell token
    for (let i = 0; i < copy.length; i++) {
      bptSpotPrice = isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100))));
      tokenSpotBPT = bptSpotPrice * copy[i].tokenDeposits;
      totalSpotBPT += tokenSpotBPT
    }

      for (let i = 0; i < copy.length; i++) {
        bptSpotPrice = isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100))));
        tokenSpotBPT = bptSpotPrice * copy[i].tokenDeposits;
        const investEntry = {
          tokenName: copy[i].assetName,
          depositAmount: Number(copy[i].tokenDeposits),
          bptSpotPrice: isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100)))),
          tokenSpotBPT: bptSpotPrice * copy[i].tokenDeposits,
          proportionalEntry: totalSpotBPT * copy[i].poolWeights/100,
          netSingleDepost: bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0,
          depositImpact: isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits),
          newTokenBalance: Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits))),
          tokenEffectiveBPT: ((((Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits)))) ** (copy[i].poolWeights/100)) / (copy[i].assetBalance ** (copy[i].poolWeights/100)) - 1) * totalPoolTokens) / (Number(copy[i].tokenDeposits)) * copy[i].tokenDeposits,
          bptEffectivePrice: ((((Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits)))) ** (copy[i].poolWeights/100)) / (copy[i].assetBalance ** (copy[i].poolWeights/100)) - 1) * totalPoolTokens) / (Number(copy[i].tokenDeposits)),
        }

        bptArray.push(investEntry)
      };

    return bptArray;
}