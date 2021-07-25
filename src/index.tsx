import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

// components
import App from './App';

// redux
import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
