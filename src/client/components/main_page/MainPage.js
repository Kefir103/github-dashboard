import React, { Component } from 'react';
import ListItem from './ListItem';
import Paginator from './Paginator';
import { GITHUB_API_TOKEN } from '../../../../config';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            searchText: '',
            currentPage: Number(localStorage.getItem('page')),
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
            localStorage.setItem('search', this.state.searchText);
        } else {
            localStorage.removeItem('search');
        }
        this.searchRepos(localStorage.getItem('page'), false);
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

        let url = `https://api.github.com/search/repositories?q=${localStorage.getItem(
            'search'
        )}&sort=stars&order=desc&page=${page}&per_page=10`;

        if (!localStorage.getItem('search')) {
            url = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=10`;
        }

        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': GITHUB_API_TOKEN, // Добавьте свой токен в файл config.js, либо удалите эту строку (наличие токена увеличит лимит запросов к API Github
            },
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    repos: result.items,
                    totalCount: result.total_count,
                    currentPage: page,
                });
                localStorage.setItem('page', page.toString());
            });
    }

    componentDidMount() {
        this.searchRepos(localStorage.getItem('page'));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentPage !== prevState.currentPage) {
            localStorage.setItem('page', this.state.currentPage);
            this.searchRepos(localStorage.getItem('page'));
        }
    }

    render() {
        return (
            <div>
                <form id={'search-form'}>
                    <input
                        type={'search'}
                        placeholder={'Введите имя репозитория'}
                        onChange={this.handleSearchInputChange}
                        defaultValue={localStorage.getItem('search')}
                    />
                    <button type={'submit'} onClick={this.handleSubmitClick} />
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
