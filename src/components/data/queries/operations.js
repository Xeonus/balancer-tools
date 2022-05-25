import gql from 'graphql-tag';
export const getBalancerPoolData = gql`
{
  balancers(first: 500) {
    id
    pools(first: 500) {
      name
      totalLiquidity
      totalShares
      poolType
      tokens {
        symbol
        id
        balance
        weight
      }
      id
    }
    totalLiquidity
  }
}
  `;

export const getGaugeData = gql`
{
  votingEscrows {
    stakedSupply
  }
  liquidityGauges {
    symbol
    poolAddress
    poolId
    totalSupply
    id
    shares {
      balance
    }
  }
}
  `;

export const getGaugeUserVotes = gql`
{
  gaugeVotes(
    where: {gauge_contains_nocase: "0x055d483d00b0ffe0c1123c96363889fb03fa13a4", timestamp_lt: 1653469291}
  ) {
    weight
    user {
      votingLocks {
        lockedBalance
      }
      id
    }
  }
}
  `;