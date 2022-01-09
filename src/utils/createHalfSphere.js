//Create a half-sphere trace at specific coordinates based on assetArray config
//Half-sphere is then mirror duplicated to create a sphere at the coordinate set specified at assetArray

import { calculateILFromAssetArray } from "./calculateILFromAssetArray";

export function createHalfSphere(assetArray) {
    const copy = [...assetArray];
    let xS = [];
	let yS = [];
	let zS = [];
    if (copy.length > 1) {
    const x = Number(copy[0].priceChange);
    const y = Number(copy[1].priceChange);
    const stepSize = 1;
	
    var phiArr = [];
    var thetaArr = [];
	var numPoints = 5;
    const size = 5;
    const zScaling = 5;

	var stopValuePhi = Math.PI/2;
	var stopValueTheta = 2*Math.PI;
    var stepPhi = stopValuePhi / (numPoints - 1);
    var stepTheta = stopValueTheta / (numPoints - 1);
    for (var i = 0; i < numPoints; i+=stepSize) {
      phiArr.push(stepPhi * i);
      thetaArr.push(stepTheta * i);
    }
    
	for (i=0; i<thetaArr.length; i+=stepSize){
	    for (var j=0; j<phiArr.length; j+=stepSize){
	        xS.push(x + size*Math.cos(thetaArr[i]) * Math.sin(phiArr[j]));
	        yS.push(y + size*Math.sin(thetaArr[i]) * Math.sin(phiArr[j]));   
	        zS.push(calculateILFromAssetArray(assetArray) + size/zScaling*Math.cos(phiArr[j]));
	    }
	}
}
    return {xS,yS,zS};
}