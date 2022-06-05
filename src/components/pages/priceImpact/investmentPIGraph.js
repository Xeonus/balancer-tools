import React from "react";
import Plot from "react-plotly.js";

export function InvestmentPIGraphs(props) {
  const copy = [...props.assetArray];

  let totalPoolTokens = copy[0].totalShares;
  let totalSpotBPT = 0;
  let tokenSpotBPT = 0;
  let swapFee = props.SwapFee / 100;
  let bptSpotPrice =  isNaN(copy[0].tokenDeposits) ? 0 : 1/(copy[0].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[0].poolWeights/100))));
  //let effectivePrice = Number((1 / (1 + swapFee)) * props.sellTokenQuantity / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1 / (1 + swapFee)) * props.sellTokenQuantity))) ** (tokenInWeight / tokenOutWeight)))));

  let amountOfTokensDeposited = [];
  for (var i = 0; i <= 1000 + 10; i += 10) {
    amountOfTokensDeposited.push(i);
  };

  let linearPriceLine = [];
  for (var j = 0; j <= 1000 + 10; j += 10) {
    linearPriceLine.push((bptSpotPrice) * j)
  };

  let effectivePriceLine = [];
  let depositPriceImpact =[];
  for (j = 0; j <= 1000 + 10; j += 10) {
    tokenSpotBPT = bptSpotPrice * j;
    totalSpotBPT = tokenSpotBPT;
        const investEntry = {
          depositAmount: Number(j),
          bptSpotPrice: isNaN(j) ? 0 : 1/(copy[0].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[0].poolWeights/100)))),
          tokenSpotBPT: bptSpotPrice * j,
          proportionalEntry: totalSpotBPT * copy[0].poolWeights/100,
          netSingleDepost: bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0,
          depositImpact: isNaN((bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0) / bptSpotPrice * j) ? 0 : (bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0) / (bptSpotPrice * j === 0 ? 1 : bptSpotPrice * j),
          newTokenBalance: Number(copy[0].assetBalance) + Number(j) - (Number(j) * swapFee * (isNaN((bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0) / bptSpotPrice * j) ? 0 : (bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0) / (bptSpotPrice * j === 0 ? 1 : bptSpotPrice * j))),
          tokenInvariantRatio: ((Number(copy[0].assetBalance) + Number(j) - (Number(j) * swapFee * (isNaN((bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0) / bptSpotPrice * j) ? 0 : (bptSpotPrice * j > totalSpotBPT * copy[0].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[0].poolWeights/100 : 0) / (bptSpotPrice * j === 0 ? 1 : bptSpotPrice * j)))) ** (copy[0].poolWeights/100)) / (copy[0].assetBalance ** (copy[0].poolWeights/100))
        }

        effectivePriceLine.push((investEntry.tokenInvariantRatio - 1) * totalPoolTokens);
        depositPriceImpact.push((1 - ((investEntry.tokenInvariantRatio - 1) * totalPoolTokens / tokenSpotBPT)) * 100);
  };


  return (
    <Plot
      data={[
        {
          x: amountOfTokensDeposited,
          y: linearPriceLine,
          type: 'scatter',
          colorscale: 'Portland',
          name: "Linearized Swap Quantity",
        },
        {
          x: amountOfTokensDeposited,
          y: effectivePriceLine,
          type: 'scatter',
          colorscale: 'Greens',
          name: "Effective Swap Quantity",
        },
        {
          x: amountOfTokensDeposited,
          y: depositPriceImpact,
          type: 'scatter',
          colorscale: 'Electric',
          name: "Price Impact %",
          yaxis: 'y2'
        }
      ]}
      layout={{
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: "rgba(0,0,0,0)",
        xaxis: {
          title: copy[0].assetName + " Quantity",
          titlefont: {
            size: 14,
            color: props.darkState ? "white" : "black",
          },
          tickfont: {
            color: props.darkState ? "white" : "black",
          },
          showgrid: false,
        },
        yaxis: {
          title: "Pool Token Quantity",
          titlefont: {
            size: 14,
            color: props.darkState ? "white" : "black",
          },
          tickfont: {
            color: props.darkState ? "white" : "black",
          },
          showgrid: false,
        },
        yaxis2: {
          title: "Price Impact %",
          titlefont: {
            size: 14,
            color: props.darkState ? "white" : "black",
          },
          tickfont: {
            color: props.darkState ? "white" : "black",
          },
          showgrid: false,
          side: 'right',
        },
        showlegend: true,
        legend: {
          x: 0,
          y: 1,
          traceorder: 'normal',
          font: {
            family: 'sans-serif',
            size: 12,
            color: props.darkState ? "white" : "black",
          },
        }
      }
      }
    />
  );
}