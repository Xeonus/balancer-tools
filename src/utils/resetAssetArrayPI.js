export function resetAssetArrayPI() {
    //Init asset array: Refactor - redundancy with ILFormField.js
    const defaultArray = []

    const defaultAssetNames = ['BAL', 'WETH'];
    const defaultAssetBalance = [5000000, 7000];
    const defaultPoolWeights = [80, 20];

    //Default init with 3 Assets
    for (let i = 0; i < defaultAssetNames.length; i++) {
        const entry = {
            assetName: defaultAssetNames[i],
            assetBalance: defaultAssetBalance[i],
            poolWeights: defaultPoolWeights[i],
        }
        defaultArray.push(entry);
      }
      return defaultArray;
  }