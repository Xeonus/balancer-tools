export function addAssetToArrayPI(assetArray) {
    const copy = [...assetArray];
    const entry = {
        assetName: 'X',
        assetBalance: 0,
        poolWeights: '1',
    }
    copy.push(entry);
    return copy;
  }