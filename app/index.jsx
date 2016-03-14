import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

import configureStore from './redux/store.js';
import App from './components/App.jsx';
import Login from './pages/Login.jsx';

import actions from './redux/actions.js';

let initialState = {
    posts: {
        areLoading: false,
        allAreLoaded: false,
        lastLoadedPage: 0,
        data: []
    }
};

let store = configureStore(initialState);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById('content')
);
