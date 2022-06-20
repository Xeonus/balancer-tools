import React from "react";
import { Box } from "@mui/material";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded';
import CalculateRoundedIcon from '@mui/icons-material/CalculateRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import ListItemIcon from '@mui/material/ListItemIcon';
import { NavLink } from "react-router-dom";
//MenuDrawer
export default function MenuDrawer(props) {

    return (
        <div>
            <Box
                sx={{ width: props.anchor === 'top' || props.anchor === 'bottom' ? 'auto' : 250 }}
                role="presentation"
                onClick={props.toggleDrawer}
                onKeyDown={props.toggleDrawer}
            >
                <List>
                    <ListItem button key={"boost"} component={NavLink} to={'/boost'}>
                        <ListItemIcon>
                            <RocketLaunchRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Boost Calculator"} />
                    </ListItem>
                    <ListItem button key={"tokenCalculator"} component={NavLink} to={'/tokenCalculator'}>
                        <ListItemIcon>
                            <RocketLaunchRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Boost Calculator"} />
                    </ListItem>
                    <ListItem button key={"impermanentLoss"} component={NavLink} to={'/impermanentLoss'}>
                        <ListItemIcon>
                            <CalculateRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Impermanent Loss Calculator"} />
                    </ListItem>
                    <ListItem button key={"priceImpact"} component={NavLink} to={'/priceImpact'} >
                        <ListItemIcon>
                            <ScaleRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Price Impact Calculator"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key={"analytics"} onClick={() => window.open('https://info.balancer.xeonus.io/')}>
                        <ListItemIcon>
                            <InsightsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Analytics"} />
                    </ListItem>

                    <ListItem button key={"status"} component={NavLink} to={'/status'}>
                        <ListItemIcon>
                            <QueryStatsRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Status Dashboard"} />
                    </ListItem>
                </List>
            </Box>
        </div>
    );
}