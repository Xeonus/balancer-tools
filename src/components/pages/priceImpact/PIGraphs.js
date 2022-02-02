import React from "react";
import Plot from "react-plotly.js";

export function PIGraphs(props) {
  const copy = [...props.assetArray];

  let tokenInBalance = 0;
  let tokenInWeight = 0;
  let tokenOutBalance = 0;
  let tokenOutWeight = 0;
  let swapFee = props.SwapFee / 100;

  for (let i = 0; i < copy.length; i++) {
    tokenInBalance += copy[i].assetName === props.sellToken ? (Number(copy[i].assetBalance)) : (0);
    tokenInWeight += copy[i].assetName === props.sellToken ? (Number(copy[i].poolWeights) / 100) : (0);

  };

  for (let i = 0; i < copy.length; i++) {
    tokenOutBalance += copy[i].assetName === props.buyToken ? Number(copy[i].assetBalance) : (0);
    tokenOutWeight += copy[i].assetName === props.buyToken ? Number(copy[i].poolWeights / 100) : (0);
  };

  let spotPrice = Number((tokenInBalance / tokenInWeight) / (tokenOutBalance / tokenOutWeight));
  //let effectivePrice = Number((1 / (1 + swapFee)) * props.sellTokenQuantity / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1 / (1 + swapFee)) * props.sellTokenQuantity))) ** (tokenInWeight / tokenOutWeight)))));

  let amountOfTokensSold = [];
  for (var i = 0; i <= 1000 + 10; i += 10) {
    amountOfTokensSold.push(i);
  };

  let linearPriceLine = [];
  for (var j = 0; j <= 1000 + 10; j += 10) {
    linearPriceLine.push((1 / spotPrice) * j)
  };

  let effectivePriceLine = [];
  for (j = 0; j <= 1000 + 10; j += 10) {
    let effectivePrice = Number((1 / (1 + swapFee)) * j / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1 / (1 + swapFee)) * j))) ** (tokenInWeight / tokenOutWeight)))));
    effectivePriceLine.push((1 / effectivePrice) * j)
  };

  let priceImpact = [];
  for (j = 0; j <= 1000 + 10; j += 10) {
    let effectivePrice = Number((1 / (1 + swapFee)) * j / (tokenOutBalance * (1 - ((tokenInBalance / (tokenInBalance + ((1 / (1 + swapFee)) * j))) ** (tokenInWeight / tokenOutWeight)))));
    priceImpact.push((effectivePrice / spotPrice - 1) * 100);
  };

  return (
    <Plot
      data={[
        {
          x: amountOfTokensSold,
          y: linearPriceLine,
          type: 'scatter',
          colorscale: 'Portland',
          name: "Linearized Swap Quantity",
        },
        {
          x: amountOfTokensSold,
          y: effectivePriceLine,
          type: 'scatter',
          colorscale: 'Greens',
          name: "Effective Swap Quantity",
        },
        {
          x: amountOfTokensSold,
          y: priceImpact,
          type: 'scatter',
          colorscale: 'Electric',
          name: "Price Impact",
          yaxis: 'y2'
        }
      ]}
      layout={{
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: "rgba(0,0,0,0)",
        xaxis: {
          title: props.sellToken + " Quantity",
          titlefont: {
            size: 14,
            color: "white"
          },
          tickfont: {
            color: "white"
          },
          showgrid: false,
        },
        yaxis: {
          title: props.buyToken + " Quantity",
          titlefont: {
            size: 14,
            color: "white",
          },
          tickfont: {
            color: "white",
          },
          showgrid: false,
        },
        yaxis2: {
          title: "Price Impact",
          titlefont: {
            size: 14,
            color: "white",
          },
          tickfont: {
            color: "white",
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
            color: 'white'
          },
        }
      }
      }
    />
  );
}