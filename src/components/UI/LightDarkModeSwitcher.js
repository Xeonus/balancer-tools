import React from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import Button from '@mui/material/Button';

export default function LightDarkModeSwitcher(props) {
  return (
      props.darkState ? <NightsStayIcon/> : <LightModeIcon style={{fill: "orange"}} />
  );
}