import React, { Component } from 'react';

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
        let response = fetch(
            `https://api.github.com/search/repositories?q=stars:>500&sort=stars&order=desc&page=${page}&per_page=10`
        )
            .then((response) => response.json())
            .then((result) => {
                this.setState(() => ({
                    repos: result.items,
                }));
                localStorage.setItem('page', page.toString());
                localStorage.setItem('searchingRepos', JSON.stringify(result.items));
            });
    }

    componentDidMount() {
        if (!localStorage.getItem('page') || !localStorage.getItem('searchingRepos')) {
            this.fillByEmptySearchField(localStorage.getItem('page'));
        } else {

        }
    }

    render() {
        return (
            <div>
                <form id={'search-form'}>
                    <input type={'search'} placeholder={'Введите имя репозитория'} />
                    <button type={'submit'} />
                </form>
            </div>
        );
    }
}
