export function resetAssetArray() {
    //Init asset array
    const defaultArray = []
    const defaultAssetNames = ['BAL', 'WBTC', 'WETH'];
    const defaultPriceChange = ['400', '150', '400'];
    const defaultPoolWeights = ['50', '34', '16'];

    //Default init with 3 Assets
    for (let i = 0; i < defaultAssetNames.length; i++) {
        const entry = {
            assetName: defaultAssetNames[i],
            priceChange: defaultPriceChange[i],
            poolWeights: defaultPoolWeights[i],
        }
        defaultArray.push(entry);
      }
      return defaultArray;
  }