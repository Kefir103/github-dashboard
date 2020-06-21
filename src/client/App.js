import React from 'react';
import { BrowserRouter, useHistory, Link, Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Repository from './components/Repository';
import MainPage from './components/main_page/MainPage';
import history from './history';

export default function App(props) {
    return (
        <BrowserRouter history={history}>
            <Header />
            <Switch>
                <Route path={'/'} component={MainPage} />
                <Route path={'/test'} component={Repository} />
            </Switch>
        </BrowserRouter>
    );
}
