import React  from 'react';
import Link from "@mui/material/Link";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';


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
                        Alpha Build - v0.7.0
                    </Typography>
                </Grid>
        </div>
    );
}