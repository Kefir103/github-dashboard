import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

let store;

export default function configureStore(initialState) {
    if (store) {
        return store;
    }

    store =
        process.env.NODE_ENV === 'production'
            ? createStore(rootReducer, initialState, compose(applyMiddleware(thunk)))
            : createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

    return store;
}
