import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

let store;

export default function configureStore(initialState) {
    if (store) {
        return store;
    }

    store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

    return store;
}
