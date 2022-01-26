import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function PageStatus(props) {

    const [isAvailable, setIsAvailable] = useState(false);

    //Fetch Balancer Front-End Json containing incentives data:
    const isReachable = async () =>{

        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, 'Request timed out');
        });
        const request = fetch(props.url);
        try {
            const response = await Promise
                .race([timeout, request]);
                if (response.ok) {
            setIsAvailable(true);
                }
            
        }
        catch (error) {
            console.log("Ping error", error);
        }
    }
    //Execute call
    isReachable();

    if (isAvailable) {
        console.log("App at " + props.url + " reachable: ", true)
        return (
            <div key={"pageSuccess" + props.url}>
                <Alert severity="success">
                    <AlertTitle>App Status {props.url} : Success</AlertTitle>
                    Balancer app is reachable — <strong>all systems a go!</strong>
                </Alert>
            </div>
        );
    } else {
        return (
            <Alert severity="error">
                <AlertTitle>App Status {props.url} : Error</AlertTitle>
                Balancer app is down — <strong>check it out!</strong>
            </Alert>
        );

    }
}