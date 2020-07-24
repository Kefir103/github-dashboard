import React from 'react';
import ReactDOM from 'react-dom';
import '../../public/styles.css';
import App from './App';
import { Provider } from 'react-redux';
import { initialState } from './redux/store/initialState';
import configureStore from './redux/store/configureStore';

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
