import React from "react";
import { Button, MenuItem} from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu } from "@mui/material";
import { Fade } from "@mui/material";


//Navigation bar
export default function NavBar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //Obtain actively selcted route
    const location = useLocation();

    return (
        <div>
            <Button color="primary" 
            className={location.pathname === '/boost' ? props.classes.navButton : null} component={NavLink} to={'/boost'}
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
             veBAL
            </Button>
                <Menu 
                id="fade-menu"
                aria-labelledby="fade-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose} color="primary" className={location.pathname === '/boost' ? props.classes.navButton : null} component={NavLink} to={'/boost'}>Boost</MenuItem>
                    <MenuItem onClick={handleClose} color="primary" className={location.pathname === '/tokenCalculator' ? props.classes.navButton : null} component={NavLink} to={'/tokenCalculator'}>Token Calculator</MenuItem>
                </Menu>
            <Button color="primary" className={location.pathname === '/impermanentLoss' ? props.classes.navButton : null} component={NavLink} to={'/impermanentLoss'}>Impermanent Loss</Button>
            <Button color="primary" className={location.pathname === '/priceImpact' ? props.classes.navButton : null}component={Link} to={'/priceImpact'}>Price Impact</Button>
            <Button color= "primary" onClick={() => window.open('https://info.balancer.xeonus.io/')}>Analytics</Button>
            <Button color="primary" className={location.pathname === '/status' ? props.classes.navButton : null}component={Link} to={'/status'}>Status</Button>
            
        </div>
    );
}