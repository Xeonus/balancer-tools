import React from "react";
import Plot from "react-plotly.js";

export function ILGraphs(props) {

  let zArray = [];
  for (var j=1; j < 500; j+=10) {
    let zRows = [];
    for (var i=1; i < 500; i+=10) {
      zRows.push((((i/100)**(props.assetArray[0].poolWeights/100))*((j/100)**(props.assetArray[1].poolWeights/100)))/((i/100)*(props.assetArray[0].poolWeights/100)+(j/100)*(props.assetArray[1].poolWeights/100)));
      
    }
    zArray.push(zRows);
  };  

  console.log(zArray)

  return (
    <Plot
      data= {[
            {z: zArray,
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
        title: "Impermanent Loss vs. Relative Price Change",
        titlefont: {
          color: "white"
        },
        scene: {
          xaxis: {
            title: props.assetArray[0].assetName,
            titlefont: {
              size: 20,
              color: "white",
            },
            tickfont: {
              color: "white"}
          },
          yaxis: {
            title: props.assetArray[1].assetName,
            titlefont: {
              size: 20,
              color: "white"
            },
            tickfont: {
              color: "white"}
          },
          zaxis: {
            title: "Impermanent Loss",
            titlefont: {
              size: 20,
              color: "white"
            },
            tickfont: {
              color: "white"}
          }
        }
      }} />
  );
}
