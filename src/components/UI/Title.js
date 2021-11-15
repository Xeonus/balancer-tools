import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


export default function Title(props) {
  return (
    <Box>
    <Typography align="center" style={{whiteSpace: 'pre-line'}} component="h2" variant="h5" color="primary">
      {props.children}
    </Typography>
    </Box>
  );
}

Title.propTypes = {
  children: PropTypes.node
};