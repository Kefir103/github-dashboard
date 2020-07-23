import React, { Component } from 'react';
import ListItem from './ListItem';
import Paginator from './Paginator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            searchText: '',
            currentPage: Number(sessionStorage.getItem('page')),
            totalCount: 0,
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCurrentPageChange = this.handleCurrentPageChange.bind(this);
    }

    handleSearchInputChange(event) {
        event.preventDefault();
        this.setState({
            searchText: event.target.value,
        });
    }

    handleSubmitClick(event) {
        event.preventDefault();
        if (this.state.searchText) {
            sessionStorage.setItem('search', this.state.searchText);
        } else {
            sessionStorage.removeItem('search');
        }
        sessionStorage.setItem('page', '1');
        this.setState({
            currentPage: 1,
        });
        this.searchRepos(sessionStorage.getItem('page'));
    }

    handleCurrentPageChange(page) {
        this.setState({
            currentPage: page,
        });
    }

    searchRepos(page) {
        if (!page) {
            page = 1;
        }

        let url = `https://api.github.com/search/repositories?q=${sessionStorage.getItem(
            'search'
        )}&sort=stars&order=desc&page=${page}&per_page=10`;

        if (!sessionStorage.getItem('search')) {
            url = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=10`;
        }

        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    repos: result.items,
                    totalCount: result.total_count,
                    currentPage: page,
                });
                sessionStorage.setItem('page', page.toString());
            });
    }

    componentDidMount() {
        this.searchRepos(sessionStorage.getItem('page'));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentPage !== prevState.currentPage) {
            sessionStorage.setItem('page', this.state.currentPage);
            this.searchRepos(sessionStorage.getItem('page'));
        }
    }

    render() {
        return (
            <div className={'app-container'}>
                <form id={'search-form'}>
                    <button type={'submit'} onClick={this.handleSubmitClick}>
                        <FontAwesomeIcon icon={faSearch} color={'whitesmoke'}/>
                    </button>
                    <input
                        type={'search'}
                        placeholder={'Введите имя репозитория'}
                        onChange={this.handleSearchInputChange}
                        defaultValue={sessionStorage.getItem('search')}
                    />
                </form>
                {this.state.repos && this.state.repos.length !== 0
                    ? [
                          this.state.repos.map((repository) => {
                              return <ListItem repository={repository} />;
                          }),
                          <Paginator
                              handleElementChanged={this.handleCurrentPageChange}
                              currentPage={this.state.currentPage}
                              totalCount={this.state.totalCount}
                          />,
                      ]
                    : ''}
            </div>
        );
    }
}
