import React from "react";
import { Typography } from "@mui/material";
import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import { Box } from "@mui/system";

export default function ShowCalcuation(props) {

    const ilToolTip =
        "$$" +
        " \\textrm{impermanentLoss} = \\frac{\\textrm{valueOfPool}}{\\textrm{assetValueIfHeld}} - 1 " +
        "$$"

    let poolValueString = "$$ \\textrm{valueOfPool}=";
    let assetValueString = "$$ \\textrm{assetValueIfHeld}=";

    const copy = [...props.assetArray];

    for (let i = 0; i < copy.length; i++) {
        poolValueString += (1 + 1 * Number(copy[i].priceChange / 100)) + "^{\\frac{" + Number(copy[i].poolWeights.toFixed(2)) + "}{100}}";
        assetValueString += "\\frac{" + (1 + 1 * Number(copy[i].priceChange / 100)) + "\\cdot" + Number(copy[i].poolWeights).toFixed(2) + "}{100}";
        if (i < Number(copy.length - 1)) {
            poolValueString += "\\cdot";
            assetValueString += "+";
        }
    }
    poolValueString += "$$";
    assetValueString += "$$";

    return (
        <div>
            <Box p={2}>
                <Typography variant="h5">Calculating Impermanent Loss</Typography>
            </Box>
            <Box>
                <Typography>
                    <Latex>{ilToolTip}</Latex>
                </Typography>
            </Box>
            <Box p={2}>
                <Typography variant="h6">Calculating 'Value of Pool'</Typography>
            </Box>
            <Box>
                <Typography >
                    To obtain the Pool Value, retrieve each asset's weight,
                    divide it by 100 to the power of the price change. Multiply all entries:
                </Typography>
                <Box p={1}>
                    <Typography  >
                        <Latex>{poolValueString}</Latex>
                    </Typography>
                </Box>
            </Box>
            <Box p={2}>
                <Typography variant="h6">Calculating 'Asset Value if Held'</Typography>
            </Box>
            <Box>
                <Typography>
                    To obtain the total value of all assets if held, multiply each price
                    change of each asset by its weight, divide by 100 and calculate the sum:
                </Typography>
                <Box p={1}>
                    <Typography  >
                        <Latex>{assetValueString}</Latex>
                    </Typography>
                </Box>
            </Box>
        </div>
    );
}

