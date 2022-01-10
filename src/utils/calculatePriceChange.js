export function calculatePriceChange(assetArray, id) {
    //Init asset array: Refactor - redundancy with ILFormField.js
    const copy = [...assetArray];

    //Calculate priceChange from entry/exit price ratio
    for (let i = 0; i < copy.length; i++) {
        if (id === "priceChange") {
            if (copy[i].priceChange == 0) {
                copy[i].entryPrice = copy[i].exitPrice;
            } else {
            copy[i].exitPrice = Number(copy[i].priceChange * copy[i].entryPrice / 100).toFixed(0);
            }
        } else {
            copy[i].priceChange = Number(copy[i].exitPrice / copy[i].entryPrice * 100).toFixed(0);

        }
      }
      return copy;
  }