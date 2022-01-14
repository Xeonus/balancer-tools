export function resetAssetArray() {
    //Init asset array: Refactor - redundancy with ILFormField.js
    const defaultArray = []

    const defaultAssetNames = ['BAL', 'WETH'];
    const defaultAssetBalance = [5000000, 7000];
    const defaultPriceChange = [150, -25];
    const defaultPoolWeights = [80, 20];
    const defaultEntryPrice = [10, 4000];
    const defaultExitPrice = [25, 3000];

    //Default init with 3 Assets
    for (let i = 0; i < defaultAssetNames.length; i++) {
        const entry = {
            assetName: defaultAssetNames[i],
            assetBalance: defaultAssetBalance[i],
            priceChange: defaultPriceChange[i],
            poolWeights: defaultPoolWeights[i],
            entryPrice: defaultEntryPrice[i],
            exitPrice: defaultExitPrice[i],
        }
        defaultArray.push(entry);
      }
      return defaultArray;
  }