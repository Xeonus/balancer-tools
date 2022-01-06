import React from "react";
import Plot from "react-plotly.js";

export function ILGraphs(props) {

  const stepSize = 12;

  let zArray = [];
  for (var j=0; j < 500; j+=stepSize) {
    let zRows = [];
    for (var i=0; i < 500; i+=stepSize) {
      !!props.assetArray[0] ? (zRows.push(100*Math.abs(((((i)/100)**(props.assetArray[0].poolWeights/100))*(((j)/100)**((1-props.assetArray[0].poolWeights/100))))/(((i)/100)*(props.assetArray[0].poolWeights/100)+((j)/100)*((1-props.assetArray[0].poolWeights/100)))-1))) : (zRows.push(i+1))
      
    }
    zArray.push(zRows);
  };  

  let x = [];
  for (var k=-100; k<400; k+=stepSize) {
    x.push(k);
  };

  return (
    <Plot
      data= {[
            {z: zArray,
            x: x,
            y: x,
            type: "surface",
            colorscale:'Portland',
            colorbar: {x: 1, len: 0.5},
            lighting: {
              roughness: 0.25,
              ambient: 1,
              diffuse: 0.2
            }
            }
      ]}
      layout={{
        width: 600,
        height: 500,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        margin: {
          l: 50,
          r: 50,
          b: 25,
          t: 25,
          pad: 4
        },
        title: "Impermanent Loss vs. Price Change %",
        titlefont: {
          color: props.darkState ? "white" : "black",
        },
        scene: {
          xaxis: {
            title: !!(props.assetArray[0]) ? (props.assetArray[0].assetName + " Price Change (%)") : ( "No Asset Listed"),
            titlefont: {
              size: 14,
              color: props.darkState ? "white" : "black",
            },
            tickfont: {
              color: props.darkState ? "white" : "black"},
          },
          yaxis: {
            title: !!(props.assetArray[1]) ? (props.assetArray[1].assetName + " Price Change (%)") : ( "No Asset Listed"),
            titlefont: {
              size: 14,
              color: props.darkState ? "white" : "black",
            },
            tickfont: {
              color: props.darkState ? "white" : "black",},
          },
          zaxis: {
            title: "Impermanent Loss (%)",
            titlefont: {
              size: 14,
              color: props.darkState ? "white" : "black",
            },
            tickfont: {
              color: props.darkState ? "white" : "black",}
          },
          aspectmode:'cube',
		      domain:{row:0, column:0},
          camera: {
            eye: {
              x: 2.25, 
              y: 0.75, 
              z: 0.75,
            },
            center: {
              x: -0.1,
              y: 0, 
              z: -0.25,
            }
          }
        }
      }} />
  );
}
