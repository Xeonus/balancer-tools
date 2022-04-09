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
    }
  }
  `;