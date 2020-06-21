import React, { Component } from 'react';
import ListItem from './ListItem';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
            searchText: '',
        };

        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
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
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    repos: result.items,
                });
                localStorage.setItem('page', page.toString());
            });
    }

    componentDidMount() {
        this.searchRepos(localStorage.getItem('page'));
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
                    <button type={'submit'} onClick={this.handleSubmitClick}/>
                </form>
                {this.state.repos
                    ? this.state.repos.map((repository) => <ListItem repository={repository} />)
                    : ''}
            </div>
        );
    }
}
