//Idea of flow:
//Separately fetch LM json, import here as props
//Execute query based on props.chainId same as poolSelector
//Encapsulate function to fetch pool data in utils -> that function calls coinList and fetches relevant tokens in one coingecko query!
//create pool data array with all info (tokenlist, swapfee, weights, link, tvl
//Helper componets to fetch token icon lists and stack them similar to coingecko
//Create data table overview, can copy pasta code from balancer.tools v1