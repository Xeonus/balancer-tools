//Supported chains:
// 1: Ethereum
// 137: Polyon
// 42161: Arbitrum

//TODO: depreacte?


//Polygon
//const qiId = '0x580a84c73811e1839f75d86d75d88cca0c241ff4';
//const mtaId = '0xF501dd45a1198C2E1b5aEF5314A68B9006D842E0';
//const maticId = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';
//const telId = '0xdf7837de1f2fa4631d716cf2502f8b230f1dcc32';
//const balId = '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3';
//const tusdId = '0x2e1ad108ff1d8c782fcbbb89aad783ac49586756';

//Arbitrum
//const qiId = '0x580a84c73811e1839f75d86d75d88cca0c241ff4';
//const mtaId = '0xF501dd45a1198C2E1b5aEF5314A68B9006D842E0';


export const coinList = [
    {
        tokenName: "BAL",
        coingeckoId: "balancer",
        chainId: "1",
        tokenId: "0xba100000625a3754423978a60c9317c58a424e3d",
        legacyClaim: "https://claim.balancer.fi",
        claim: "https://app.balancer.fi",

    },
    {
        tokenName: "BAL",
        chainId: "137",
        tokenId: "0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3",
        coingeckoId: "balancer",
        legacyClaim: "Airdrop around Tue-Wed",
        claim: "https://polygon.balancer.fi",
    },
    {
        tokenName: "BAL",
        chainId: "42161",
        tokenId: "0xba100000625a3754423978a60c9317c58a424e3d",
        coingeckoId: "balancer",
        legacyClaim: 'https://claim-arbitrum.balancer.fi',
        claim: 'https://arbitrum.balancer.fi'
    },
    {
        tokenName: "LDO",
        chainId: "1",
        tokenId: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
        coingeckoId: "lido-dao",
        legacyClaim: "-",
        claim: "https://claim-lido.balancer.fi",
    },
    {
        tokenName: "VITA",
        chainId: "1",
        tokenId: "0x81f8f0bb1cb2a06649e51913a151f0e7ef6fa321",
        coingeckoId: "vitadao",
        legacyClaim: "-",
        claim: "https://claim-vita.balancer.fi",
    },
    {
        tokenName: "UNN",
        chainId: "1",
        tokenId: "0x226f7b842e0f0120b7e194d05432b3fd14773a9d",
        coingeckoId: "union-protocol-governance-token",
        claimLocation: "-",
        claimLocationNew: "https://app.balancer.fi",
    },
    {
        tokenName: "BANK",
        chainId: "1",
        tokenId: "0x2d94aa3e47d9d5024503ca8491fce9a2fb4da198",
        coingeckoId: "bankless-dao",
        claimLocation: "-",
        claimLocationNew: "https://app.balancer.fi",
    },
    {
        tokenName: "NOTE",
        chainId: "1",
        tokenId: "0xcfeaead4947f0705a14ec42ac3d44129e1ef3ed5",
        coingeckoId: "notional-finance",
        claimLocation: "-",
        claimLocationNew: "https://app.balancer.fi",
    },
    {
        tokenName: "NEXO",
        chainId: "1",
        tokenId: "0xb62132e35a6c13ee1ee0f84dc5d40bad8d815206",
        coingeckoId: "nexo",
        claimLocation: "-",
        claimLocationNew: "https://app.balancer.fi",
    },
    {
        tokenName: "D2D",
        chainId: "1",
        tokenId: "0x43d4a3cd90ddd2f8f4f693170c9c8098163502ad",
        coingeckoId: "prime",
        claimLocation: "-",
        claimLocationNew: "https://app.balancer.fi",
    },
    {
        tokenName: "QI",
        chain: "Polygon",
        chainId: "polygon",
        claimLocation: "-",
        claimLocationNew: "Airdrop around Wed-Thu",
    },
    {
        tokenName: "MTA",
        chain: "Polygon",
        chainId: "polygon",
        claimLocation: "-",
        claimLocationNew: "Airdrop around Wed",
    },
    {
        tokenName: "TEL",
        chain: "Polygon",
        chainId: "polygon",
        claimLocation: "-",
        claimLocationNew: "Airdrop around Wed",
    },
    {
        tokenName: "MCB",
        chain: "Aribitrum",
        chainId: "arbitrum",
        claimLocation: '-',
        claimLocationNew: 'https://claim-mcdex.balancer.fi',
    }
];