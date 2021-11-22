import React from 'react';
import CountUp from 'react-countup';

export default function DynamicValueFormatter(props) {
    return (
        <CountUp 
            className={props.name} 
            start={0} 
            end={Number(props.value).toFixed(props.decimals)} 
            duration={0.5} 
            decimals={props.decimals} 
            separator=",">{Number(props.value).toFixed(props.decimals)}
        </CountUp>

    );
}