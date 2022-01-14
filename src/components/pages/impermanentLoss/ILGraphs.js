import React from "react";
import Plot from "react-plotly.js";
import { calculateILFromAssetArray } from "../../../utils/calculateILFromAssetArray";
import { createHalfSphere } from "../../../utils/createHalfSphere";

export function ILGraphs(props) {

  //Create IL data
  const stepSize = 12;
  let zArray = [];
  for (var j=0; j <= 500 + stepSize; j+=stepSize) {
    let zRows = [];
    for (var i=0; i <= 500 + stepSize ; i+=stepSize) {
      !!props.assetArray[0] ? (zRows.push(100*Math.abs(((((i)/100)**(props.assetArray[0].poolWeights/100))*(((j)/100)**((1-props.assetArray[0].poolWeights/100))))/(((i)/100)*(props.assetArray[0].poolWeights/100)+((j)/100)*((1-props.assetArray[0].poolWeights/100)))-1))) : (zRows.push(i+1));
    }
    zArray.push(zRows);

  };  

  //Create Swap Fee Data
  let zSwaps = [];
  for (j=0; j <= 500 + stepSize; j+=stepSize) {
    let zSwapRows = [];
    for (i=0; i <= 500 + stepSize ; i+=stepSize) {
      !!props.assetArray[0] ? (zSwapRows.push(100*(1-(1-Math.abs(((((i)/100)**(props.assetArray[0].poolWeights/100))*(((j)/100)**((1-props.assetArray[0].poolWeights/100))))/(((i)/100)*(props.assetArray[0].poolWeights/100)+((j)/100)*((1-props.assetArray[0].poolWeights/100)))-1))*(1+props.SwapFee/100)))) : (zSwapRows.push(i+1));
    }
    zSwaps.push(zSwapRows);

  };
  
    //Sets boundaries of x and y axis from -100 to 400 %
  let x = [];
  for (var k=-100; k<= 400 + stepSize; k+=stepSize) {
    x.push(k);
  };


  //Create Half-Sphere Data
let { xS,yS,zS }  = createHalfSphere(props.assetArray);

  return (
    <Plot
      data= {[
            
            {z: zSwaps,
              x: x,
              y: x,
              type: "surface",
              name: "IL with Swap Fees",
              showlegend: true,
              colorscale:'Greens',
              colorbar: {x: 1.2, len: 0.5},
              opacity:0.9,
              showscale: true,
              lighting: {
                roughness: 0.25,
                ambient: 1,
                diffuse: 0.2
              }
            },
            {z: zArray,
              x: x,
              y: x,
              type: "surface",
              name: "Impermanent Loss",
              showlegend: true,
              colorscale:'Portland',
              colorbar: {x: 1, len: 0.5},
              opacity:0.9,
              lighting: {
                roughness: 0.25,
                ambient: 1,
                diffuse: 0.2
              }
            },
            {
              x: xS,
              y: yS,
              z: zS,
              color: 'rgb(211,211,211)',
              type: "mesh3d",
              name: "Current Position",
              showlegend: true,
              lighting: {
                roughness: 0.25,
                ambient: 1,
                diffuse: 0.2
              }
              },
              {
                x: xS,
                y: yS,
                z: zS.map(v => -v+2*calculateILFromAssetArray(props.assetArray)),
                color: 'rgb(211,211,211)',
                name: "Current Position",
                type: "mesh3d",
                lighting: {
                  roughness: 0.25,
                  ambient: 1,
                  diffuse: 0.2
                }
                }
      ]}
      layout={{
        width: 650,
        height: 500,
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        margin: {
          l: 50,
          r: 50,
          b: 0,
          t: 20,
          pad: 0
        },
        //title: "Impermanent Loss vs. Price Change %",
        titlefont: {
            color: props.darkState ? "white" : "black",
        },
        legend: {
          font: {
          color: props.darkState ? "white" : "black",
        }
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
              x: 2, 
              y: 0.1, 
              z: 1,
            },
            center: {
              x: 0.1,
              y: -0.05, 
              z: -0.15,
            }
          }
        }
      }} />
  );
}
