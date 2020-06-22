import React, { Component } from 'react';
import history from '../../history';
import { num2str } from '../../localeFunctions';
import Contributor from './Contributor';
import { GITHUB_API_TOKEN } from '../../../../config';

export default class Repository extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contributors: [],
        };
    }

    componentDidMount() {
        fetch(`${this.props.location.state.contributors_url}?per_page=10`, {
            method: 'GET',
            headers: {
                'Authorization': GITHUB_API_TOKEN, // Добавьте свой токен в файл config.js, либо удалите эту строку (наличие токена увеличит лимит запросов к API Github
            },
        })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    contributors: result,
                });
            });
    }

    render() {
        return (
            <div className={'repository'}>
                <div
                    className={'back-button'}
                    onClick={() => {
                        history.push('/');
                    }}>
                    <p>&lArr; Назад</p>
                </div>
                <h2>{this.props.location.state.name}</h2>
                <p>
                    {this.props.location.state.stargazers_count}{' '}
                    {num2str(this.props.location.state.stargazers_count, [
                        'звезда',
                        'звезды',
                        'звезд',
                    ])}
                </p>
                <a href={this.props.location.state.html_url}>
                    {this.props.location.state.html_url}
                </a>
                <hr />
                <div className={'repository author'}>
                    <h3>Автор репозитория</h3>
                    {this.props.location.state.owner.avatar_url ? (
                        <img
                            src={this.props.location.state.owner.avatar_url}
                            alt={this.props.location.state.owner.avatar_url}
                            width={'200px'}
                            height={'200px'}
                        />
                    ) : (
                        ''
                    )}
                    <p
                        style={{
                            marginTop: '0',
                        }}>
                        {this.props.location.state.owner.login}
                        <br /> (
                        <a href={this.props.location.state.owner.html_url}>
                            {this.props.location.state.owner.html_url}
                        </a>
                        )
                    </p>
                    <hr />
                    <p>Используемый язык: {this.props.location.state.language}</p>
                    <p>Краткое описание: {this.props.location.state.description}</p>
                    <hr />
                    <h3>10 наиболее активных контрибьютера</h3>
                    {this.state.contributors.map((contributor, index) => (
                        <Contributor contributor={contributor} index={index + 1} />
                    ))}
                </div>
            </div>
        );
    }
}
