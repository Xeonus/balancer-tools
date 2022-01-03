import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


export default function Header(props) {
  return (
    <Box p={1} mb={1}>
    <Typography color="primary" align="center" component="h1" variant="h4">
      {props.children}
    </Typography>
    </Box>
  );
}

Header.propTypes = {
  children: PropTypes.node
};