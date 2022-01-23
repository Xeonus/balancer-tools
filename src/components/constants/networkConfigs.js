export const networks = [
    {
        id: 'ethereum',
        chainId: '1',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
        url: 'https://app.balancer.fi/#/pool/',

    },
    {
        id: 'polygon',
        chainId: '137',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
        url: 'https://polygon.balancer.fi/#/pool/',

    },
    {
        id: 'arbitrum',
        chainId: '42161',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
        url: 'https://polygon.balancer.fi/#/pool/',

    },
    {
        id: 'fantom',
        chainId: '250',
        graphQLEndPoint: 'https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx',
        url: 'https://polygon.balancer.fi/#/pool/',

    }
];