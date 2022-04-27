import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "@mui/material/Link";

export default function Helper() {

    return (
        <div>
            <Box p={2}>
                <Typography variant="h5">What is veBAL boost and how do I use this tool (ELI5)?</Typography>
            </Box>
            <Box>
            <Typography component={'div'} align='left'>
                    veBAL boost works similar to the Curve boosting system.
                    It is a way to incentivice lockers by providing them with additional rewards based on their locked veBAL position.
                </Typography>
            </Box>
            <Box p={2}>
                <Typography variant="h6">How do I need to use this tool?</Typography>
            </Box>
            <Box>
                <Typography component={'div'} align='left'>
                    Let's say you want to calculate your potential boost for the WBTC/WETH gauge by investing 10'000$. Here is what you need to do:
                    <ul>
                        <li>Select the "WBTC/WETH" gauge in the Liquidity Mining Gauge dropdown</li>
                        <li>If you have already veBAL locked, type in the amount in "Total veBAL Locked". You can find how much you have locked
                            <Link color="inherit" href="https://app.balancer.fi/#/vebal" target="_blank">
                                here
                            </Link>. If you want to add a new lock position, add your desired value in the "New/additional veBAL to lock" input field.
                        </li>
                        <li>As we want to calculate the potential boost for a 10k$ deposit, we add this amount to the "Additional/New Staked BPT ($)" input field </li>
                    </ul>
                </Typography>
            </Box>
            <Box p={2}>
                <Typography variant="h6">Where can I find additional information / documentation about veBAL boosting?</Typography>
            </Box>
            <Box>
                <Typography>
                    You can find additional information about veBAL Boosting on our <Link href="https://balancer-dao.gitbook.io/learn-about-balancer/fundamentals/vebal-tokenomics/financial-implications/boosting-bal-incentives/calculating-my-boost" target="_blank">DAO community documentation</Link>
                </Typography>
            </Box>
        </div>
    );
}

