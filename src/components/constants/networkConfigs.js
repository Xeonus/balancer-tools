export const networks = [
    {
        id: 'ethereum',
        chainId: '1',
        name: 'Ethereum',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
        url: 'https://app.balancer.fi/#/pool/',

    },
    {
        id: 'polygon',
        chainId: '137',
        name: 'Polygon',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2',
        url: 'https://polygon.balancer.fi/#/pool/',

    },
    {
        id: 'arbitrum',
        chainId: '42161',
        name: 'Arbitrum',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-arbitrum-v2',
        url: 'https://polygon.balancer.fi/#/pool/',

    },
    {
        id: 'fantom',
        chainId: '250',
        name: 'Fantom',
        graphQLEndPoint: 'https://graph-node.beets-ftm-node.com/subgraphs/name/beethovenx',
        url: 'https://beets.fi/',

    },
    {
        id: 'optimism',
        chainId: '10',
        name: 'Optimism',
        graphQLEndPoint: 'https://api.thegraph.com/subgraphs/name/beethovenxfi/beethovenx-optimism',
        url: 'https://op.beets.fi/',

    }
];