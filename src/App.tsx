import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { relayStylePagination } from '@apollo/client/utilities';

// components
import Root from './components/views/Root/Root';
import FetchAllGists from './api/fetchAllGists';

// router
import { HashRouter } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';

// types
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
