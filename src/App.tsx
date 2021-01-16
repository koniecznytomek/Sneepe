import React from 'react';
import { HashRouter } from 'react-router-dom';
import Root from './components/layout/Root/Root';
import FetchData from './components/api/FetchData';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `bearer ${token}`,
    },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            viewer: relayStylePagination(),
          },
        },
      },
    }),
  });

  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <FetchData />
      </ApolloProvider>
      <Root />
    </HashRouter>
  );
}

export default App;
