import React from 'react';
import { BrowserRouter, useHistory, Link, Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Repository from './components/repository/Repository';
import MainPage from './components/main_page/MainPage';
import history from './history';

export default function App(props) {
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route exact path={'/'} component={MainPage} />
                <Route path={'/repos/:name'} component={Repository}/>

            </Switch>
        </Router>
    );
}
