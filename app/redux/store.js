import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/index';

let finalCreateStore = compose(
    applyMiddleware(
        thunkMiddleware, // lets us dispatch() functions
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(initialState = { posts: [] }) {
    return finalCreateStore(rootReducer, initialState);
}
