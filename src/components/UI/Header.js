import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { isBrowser } from "react-device-detect";


export default function Header(props) {
  return (
    <Box p={1} mb={1}>
    <Typography color="primary" align="center" component="h1" variant={isBrowser ? "h4": "h5"}>
      {props.children}
    </Typography>
    </Box>
  );
}

Header.propTypes = {
  children: PropTypes.node
};