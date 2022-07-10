import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "@mui/material/Link";

export default function PIToolTip() {

    return (
        <div>
            <Box p={2}>
                <Typography variant="h5">What is Price Impact and when will it affect me?</Typography>
            </Box>
            <Box>
            <Typography component={'div'} align='left'>
                    Price impact will occur upon a swap in any AMM, essentially changing the price of one asset relative to another.
                    This is important for very large trades in particular and is also apparent in non-proportional investments.
                </Typography>
            </Box>
            <Box p={2}>
                <Typography variant="h6">How do I need to use this tool?</Typography>
            </Box>
            <Box>
                <Typography component={'div'} align='left'>
                    For price impact calculations follow these steps:
                    <ul>
                        <li>Pick the pool you are interested in from the drop down above. </li>
                        <li>Decide if you want to swap tokens, or invest in a pool to receive pool tokens. Use the toggle after selecting a pool.</li>
                        <li>If you are swapping, select your sell token and your buy token, then edit quantities and we will calculate the outcome. 
                            The graph below will show how the price of the token you are buying will go up as you buy more of it, hence the impact. 
                        </li>
                        <li>If you are investing, toggle to the invest option. Then edit the deposit quantities of each asset, and we will calculate the 
                            pool tokens you will receive and potnetial price impact. The graph will now show how investing a single asset will relate to pool tokens received. 
                        </li>
                    </ul>
                </Typography>
            </Box>
            <Box p={2}>
                <Typography variant="h6">Where can I find additional information / documentation about price impact?</Typography>
            </Box>
            <Box>
                <Typography>
                    You can find additional information about price impact from swaps here <Link href="https://balancer-dao.gitbook.io/learn-about-balancer/fundamentals/white-paper/spot-and-effective-price/price-impact" target="_blank">DAO community documentation</Link>
                </Typography>
                <Typography>
                    You can find additional information about price impact from investments here <Link href="https://balancer-dao.gitbook.io/learn-about-balancer/fundamentals/white-paper/deposits-and-withdrawals/deposits" target="_blank">DAO community documentation</Link>
                </Typography>
            </Box>
        </div>
    );
}

