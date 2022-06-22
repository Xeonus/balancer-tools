import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "@mui/material/Link";
import {NavLink } from "react-router-dom";

export default function BPTHelper() {

    return (
            <Box>
                <Typography>When BPT is locked for 1 full year</Typography>
                <Typography>Use the
                <Link color="inherit" component={NavLink} to={'/priceImpact'} > {" "}
                Price Impact
                </Link> tab for BPT effective pricing</Typography>
            </Box>
    )
}