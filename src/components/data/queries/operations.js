import gql from 'graphql-tag';
export const getBalancerPoolData = gql`
{
  balancers(first: 1000) {
    id
    pools(first: 1000) {
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
    where: {gauge_contains_nocase: "0xFBf87D2C22d1d298298ab5b0Ec957583a2731d15", timestamp_lt: 1660165200}
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

export const getVeBALPoolData = gql`
{
  balancers(first: 500) {
    id
    pools(first: 500, where: {id: "0x5c6ee304399dbdb9c8ef030ab642b10820db8f56000200000000000000000014"}) {
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
