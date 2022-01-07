import React from "react";
import { Button} from "@material-ui/core";
import { Link, NavLink, useLocation } from "react-router-dom";
//Navigation bar
export default function NavBar(props) {

    //Obtain actively selcted route
    const location = useLocation();

    return (
        <div>
            <Button color="primary" className={location.pathname === '/impermanentLoss' ? props.classes.navButton : null} component={NavLink} to={'/impermanentLoss'}>Impermanent Loss</Button>
            <Button color="primary" className={location.pathname === '/priceImpact' ? props.classes.navButton : null}component={Link} to={'/priceImpact'}>Price Impact</Button>
            <Button color= "primary" onClick={() => window.open('https://balancer-v2-info.web.app/')}>Analytics</Button>
            
        </div>
    );
}