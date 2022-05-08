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
    where: {gauge_contains_nocase: "0xFBf87D2C22d1d298298ab5b0Ec957583a2731d15"}
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