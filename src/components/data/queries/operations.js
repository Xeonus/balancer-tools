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
      swapFee
      tokens {
        symbol
        id
        address
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
    where: {gauge_contains_nocase: "0xF0ea3559Cf098455921d74173dA83fF2f6979495", timestamp_lt: 1654110000}
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