import React from 'react';
import { HashRouter } from 'react-router-dom';
import Root from './components/routes/Root/Root';
import FetchAllGists from './api/fetchAllGists';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';
import { Url } from './types/enums';

function App() {
    const token = useSelector((state: RootState) => state.auth.token);
    const client = new ApolloClient({
        uri: Url.API_URL,
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
                <FetchAllGists />
            </ApolloProvider>
            <Root />
        </HashRouter>
    );
}

export default App;
