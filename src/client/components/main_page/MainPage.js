import React, { Component } from 'react';
import ListItem from './ListItem';

export default class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: [],
        };
    }

    fillByEmptySearchField(page) {
        if (!page) {
            page = 1;
        }
        fetch(
            `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=10`,
            {
                method: 'GET',
            }
        )
            .then((response) => response.json())
            .then((result) => {
                localStorage.setItem('page', page.toString());
                localStorage.setItem('searchingRepos', JSON.stringify(result.items));
            });
    }

    componentDidMount() {
        if (!localStorage.getItem('page') || !localStorage.getItem('searchingRepos')) {
            this.fillByEmptySearchField(localStorage.getItem('page'));
        } else {
            this.setState({
                repos: JSON.parse(localStorage.getItem('searchingRepos')),
            });
        }
    }

    render() {
        return (
            <div>
                <form id={'search-form'}>
                    <input type={'search'} placeholder={'Введите имя репозитория'} />
                    <button type={'submit'} />
                </form>
                {this.state.repos
                    ? this.state.repos.map((repository) => <ListItem repository={repository} />)
                    : ''}
            </div>
        );
    }
}
