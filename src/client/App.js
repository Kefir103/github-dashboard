import React, { useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Repository from './components/repository/Repository';
import MainPage from './components/main_page/MainPage';
import Error from './components/Error';
import history from './history';
import { connect } from 'react-redux';

function App(props) {
    useEffect(() => {
        sessionStorage.setItem('searchText', props.searchText);
        sessionStorage.setItem('page', props.currentPage);
    }, []);

    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route exact path='/' component={MainPage} />
                <Route path='/repos/:name' component={Repository} />
                <Route path='*' component={Error} />
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.filter.currentPage,
        searchText: state.filter.searchText,
    };
};

export default connect(mapStateToProps)(App);
