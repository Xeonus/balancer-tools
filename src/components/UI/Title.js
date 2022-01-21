import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


export default function Title(props) {
  return (
    <Box>
    <Typography align="center" style={{whiteSpace: 'pre-line'}} component="h2" variant="h5">
      {props.children}
    </Typography>
    </Box>
  );
}

Title.propTypes = {
  children: PropTypes.node
};