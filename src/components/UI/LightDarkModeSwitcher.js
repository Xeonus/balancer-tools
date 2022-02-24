import React from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';

export default function LightDarkModeSwitcher(props) {
  return (
      props.mode ? <NightsStayIcon/> : <LightModeIcon style={{fill: "orange"}} />
  );
}