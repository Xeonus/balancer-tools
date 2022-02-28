import React, { useEffect, useState } from 'react';

export default function fetchLMJson() {

const [jsonData, setJsonData] = useState("");
//Fetch Balancer Front-End Json containing incentives data:
useEffect(() => {
    const url = "https://raw.githubusercontent.com/balancer-labs/frontend-v2/master/src/lib/utils/liquidityMining/MultiTokenLiquidityMining.json";

    const fetchData = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setJsonData(json);
            //Find newest week and store it in global data state
            var week = 0;
            for (var key in json) {
                var id = parseInt(key.toString().split("_")[1]);
                if (id > week) {
                    data.weekNr = id;
                }
            };
        } catch (error) {
            console.log("error", error);
        }
    };

    fetchData();
}, [setLoading]);

return json;

}