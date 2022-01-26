import gql from 'graphql-tag';
export const getBalancerPoolData = gql`
{
  balancers(first: 500) {
    id
    pools(first: 500) {
      name
      totalLiquidity
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