export function calculatePriceChange(assetArray, id) {
    //Init asset array: Refactor - redundancy with ILFormField.js
    const copy = [...assetArray];

    //Calculate priceChange from entry/exit price ratio
    for (let i = 0; i < copy.length; i++) {
        if (id === "priceChange") {
            if (copy[i].priceChange == 0) {
                copy[i].entryPrice = copy[i].exitPrice;
            } else {
            copy[i].exitPrice = Number(Number(copy[i].entryPrice) * (1 + Number(copy[i].priceChange/100))).toFixed(2);
            }
        } else {
            copy[i].priceChange = Number(((Number(copy[i].exitPrice) / Number(copy[i].entryPrice)) -1)*100).toFixed(2);

        }
      }
      console.log("copy", copy)
      return copy;
  }