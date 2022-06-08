import { useEffect, useState } from "react";

export default function FetchTokenPrices(chainId, tokenAddresses) {

    const [jsonData, setJsonData] = useState('');
    useEffect(() => {
        const baseURI = 'https://api.coingecko.com/api/v3/simple/token_price/';
        let addresses = '';
        tokenAddresses.map((el) => addresses += el.toString() + ',')
        const endpoint = chainId + '?contract_addresses=' + addresses + '&vs_currencies=usd';
        const fetchData = async () => {
        const response = await fetch(baseURI + endpoint);
        const json = response.json();
        setJsonData(json);
        };
            fetchData();

    }, [chainId, tokenAddresses]);
    return jsonData;
}