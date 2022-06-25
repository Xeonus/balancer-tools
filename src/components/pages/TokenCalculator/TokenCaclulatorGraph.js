import React from "react";
import Plot from "react-plotly.js";

export function TokenCalculatorGraph(props) {
  
    const copy = [...props.veBALArray];
    //Step 1: Define each variable relavent to the token to BPT array
    //Step 2: Calculate Spot Price, net single deposit, and taxable amount of BPT
    //Step 3: Calculate Invariant ratio after taxed value of tokens is converted to BPT
    //Step 4: Calculate BPT Out, ratio to the totalSpotBPT to determine Price impact 

    let bptArray = [];
    let bptSpotPrice = 0;
    let totalPoolTokens = Number(copy[0].totalShares);
    let tokenSpotBPT = 0;
    let totalSpotBPT = 0;
    let swapFee = props.SwapFee/100;
    let invariantRatio = 1;

    for (let i = 0; i <copy.length; i++) {
      bptSpotPrice = isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100))));
      tokenSpotBPT = bptSpotPrice * copy[i].tokenDeposits;
      totalSpotBPT += tokenSpotBPT
    }

      for (let i = 0; i < copy.length; i++) {
        bptSpotPrice = isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100))));
        tokenSpotBPT = bptSpotPrice * copy[i].tokenDeposits;
        const investEntry = {
          depositAmount: Number(copy[i].tokenDeposits),
          bptSpotPrice: isNaN(copy[i].tokenDeposits) ? 0 : 1/(copy[i].assetBalance * (1 - (1 - 1/totalPoolTokens)**(1/(copy[i].poolWeights/100)))),
          tokenSpotBPT: bptSpotPrice * copy[i].tokenDeposits,
          proportionalEntry: totalSpotBPT * copy[i].poolWeights/100,
          netSingleDepost: bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0,
          depositImpact: isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits),
          newTokenBalance: Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits))),
          tokenInvariantRatio: ((Number(copy[i].assetBalance) + Number(copy[i].tokenDeposits) - (Number(copy[i].tokenDeposits) * swapFee * (isNaN((bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / bptSpotPrice * copy[i].tokenDeposits) ? 0 : (bptSpotPrice * copy[i].tokenDeposits > totalSpotBPT * copy[i].poolWeights/100 ? tokenSpotBPT - totalSpotBPT * copy[i].poolWeights/100 : 0) / (bptSpotPrice * copy[i].tokenDeposits === 0 ? 1 : bptSpotPrice * copy[i].tokenDeposits)))) ** (copy[i].poolWeights/100)) / (copy[i].assetBalance ** (copy[i].poolWeights/100))
        }
        
        bptArray.push(investEntry)
      };

        for (let j=0; j < bptArray.length; j++) {
          invariantRatio *= bptArray[j].tokenInvariantRatio
          };

    // Calculate bpt out, considered to be max veBAL for 52 week lock
    let bptOut = (invariantRatio - 1) * totalPoolTokens

    let lockTimeArray = [];
    for (var k = 0; k <= 52; k += 1) {
        lockTimeArray.push(k)
      };     

    let veBALTimeArray = [];
    for (var l = 0; l <= 52; l += 1) {
        veBALTimeArray.push(bptOut * l/52)
      };
    
  return (
    <Plot
      data={[
        {
          x: lockTimeArray,
          y: veBALTimeArray,
          type: 'scatter',
          name: "veBAL Quantity",
          line: {
            color: "#D4AF37",
          },
        },
        {
          x: [props.lockTime],
          y: [Number(props.lockTime/52 * bptOut)],
          mode: 'markers',
          type: 'scatter',
          name: 'Your Position',
          marker: {
            color: props.darkState ? "white" : "black",
          },
        },
      ]}
      layout={{
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: "rgba(0,0,0,0)",
        xaxis: {
          title: "Lock Time (weeks)",
          domain: [0,1.5],
          showspikes: true,
          titlefont: {
            size: 16,
            color: props.darkState ? "white" : "black",
          },
          range: [55, 0],
          tickfont: {
            color: props.darkState ? "white" : "black",
          },
          showgrid: false,
        },
        yaxis: {
          title: "veBAL Quantity",
          range: [0, 1.2*bptOut ],
          showspikes: true,
          titlefont: {
            size: 16,
            color: props.darkState ? "white" : "black",
          },
          tickfont: {
            color: props.darkState ? "white" : "black",
          },
          showgrid: false,
        },
        showlegend: true,
        legend: {
          x: 1,
          y: 1,
          traceorder: 'normal',
          xanchor: 'right',
          font: {
            family: 'sans-serif',
            size: 14,
            color: props.darkState ? "white" : "black",
          },
        }
      }
      }
    />
  );
}