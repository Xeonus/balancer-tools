import React from "react";
import Plot from "react-plotly.js";

export function ILGraphs(props) {

  let zArray = [];
  for (var j=0; j < 500; j++) {
    let zRows = [];
    for (var i=0; i < 500; i++) {
      !!props.assetArray[0] ? (zRows.push(100*Math.abs(((((i)/100)**(props.assetArray[0].poolWeights/100))*(((j)/100)**(1-props.assetArray[0].poolWeights/100)))/(((i)/100)*(props.assetArray[0].poolWeights/100)+((j)/100)*(1-props.assetArray[0].poolWeights/100))-1))) : (zRows.push(i+1))
      
    }
    zArray.push(zRows);
  };  

  let x = [];
  for (var k=-100; k<400; k++) {
    x.push(k);
  };

  console.log(zArray)

  return (
    <Plot
      data= {[
            {z: zArray,
            x: x,
            y: x,
            type: "surface"
            }
      ]}
      layout={{
        width: 600,
        height: 600,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        margin: {
          l: 50,
          r: 50,
          b: 80,
          t: 80,
          pad: 4
        },
        title: "Impermanent Loss vs. Price Change %",
        titlefont: {
          color: "white"
        },
        scene: {
          xaxis: {
            title: !!(props.assetArray[0]) ? (props.assetArray[0].assetName + " Price Change %") : ( "No Asset Listed"),
            titlefont: {
              size: 16,
              color: "white",
            },
            tickfont: {
              color: "white"},
          },
          yaxis: {
            title: !!(props.assetArray[1]) ? (props.assetArray[1].assetName + " Price Change %") : ( "No Asset Listed"),
            titlefont: {
              size: 16,
              color: "white"
            },
            tickfont: {
              color: "white"},
          },
          zaxis: {
            title: "Impermanent Loss",
            titlefont: {
              size: 16,
              color: "white"
            },
            tickfont: {
              color: "white"}
          }
        }
      }} />
  );
}
