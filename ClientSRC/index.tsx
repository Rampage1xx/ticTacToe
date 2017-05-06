import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router';
import {routes} from './Routes';
import {history, store} from './StoreAndReducers/store';
import './style.css';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);