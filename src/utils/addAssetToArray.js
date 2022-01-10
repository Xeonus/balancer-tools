
export function addAssetToArray(assetArray) {
    const copy = [...assetArray];
    const entry = {
        assetName: 'X',
        priceChange: '0',
        poolWeights: '1',
        entryPrice: 1,
        exitPrice: 1,
    }
    copy.push(entry);
    return copy;
  }