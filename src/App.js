import './App.css';
import Dashboard from './components/UI/Dashboard'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { RetryLink } from 'apollo-link-retry';
import { HttpLink } from '@apollo/client';

//Set up directional links
const directionalLink =
  new RetryLink().split(
  (operation) => operation.getContext().clientName === 'mainnet',
  new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2" }),
  new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-polygon-v2" }),
  );


//Instantiate Apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: directionalLink,
});

function App() {
  return (
    
    <div className="App">
      <ApolloProvider client={client}>
      <Dashboard/>
      </ApolloProvider>
    </div>
  );
}

export default App;
