import React  from 'react';
import Link from "@material-ui/core/Link";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';


export default function Footer() {
    return (
        <div style={{overflow: "hidden", textOverflow: "ellipsis"}}>
                <Grid >
                    <Typography noWrap={false} variant="caption" color="textSecondary" component="span">
                        {"Made by Xeonus and Zen Dragon with"} <FavoriteIcon fontSize="small"></FavoriteIcon>  {"for the "}
                        <Link color="inherit" href="https://balancer.fi">
                            Balancer
                        </Link>{" "}
                        {"Community"}
                    </Typography>
                </Grid>

                <Grid>
                    <Typography noWrap={false} variant="caption" color="textSecondary" component="span">
                        Donate: {" "}
                        <Link color="inherit" href="https://etherscan.io/address/0xf9e0dE629DE67eC90FBe095d2e6843f6A76aeEc2" target="_blank">
                            0xf9e0dE629DE67eC90FBe095d2e6843f6A76aeEc2
                        </Link> <br />
                        Information provided as is. Not financial advice. <br />
                        Alpha Build - v0.4.0
                    </Typography>
                </Grid>
        </div>
    );
}