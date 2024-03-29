import React from "react";
import { Button} from "@mui/material";
import { Link, NavLink, useLocation } from "react-router-dom";


//Navigation bar
export default function NavBar(props) {

    //Obtain actively selcted route
    const location = useLocation();

    return (
        <div>
            <Button color="primary" className={location.pathname === '/veBAL' ? props.classes.navButton : null} component={NavLink} to={'/veBAL'}>veBAL</Button>
            <Button color="primary" className={location.pathname === '/impermanentLoss' ? props.classes.navButton : null} component={NavLink} to={'/impermanentLoss'}>Impermanent Loss</Button>
            <Button color="primary" className={location.pathname === '/priceImpact' ? props.classes.navButton : null}component={Link} to={'/priceImpact'}>Price Impact</Button>
            <Button color= "primary" onClick={() => window.open('https://balancer.defilytica.com/')}>Analytics</Button>
            <Button color="primary" className={location.pathname === '/status' ? props.classes.navButton : null}component={Link} to={'/status'}>Status</Button>
            
        </div>
    );
}