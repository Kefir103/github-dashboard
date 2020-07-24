import React, { useEffect } from 'react';
import history from '../../history';
import { num2str } from '../../localeFunctions';
import Contributor from './Contributor';
import { bindActionCreators } from 'redux';
import { loadContributors } from '../../redux/actions/repoActions';
import { connect } from 'react-redux';

export function Repository(props) {
    useEffect(() => {
        props.actions.loadContributors(props.location.state.contributors_url);
    }, []);

    return (
        <div className={'app-container repository'}>
            <div
                className={'back-button'}
                onClick={() => {
                    history.push('/');
                }}>
                <p>&lArr; Назад</p>
            </div>
            <h2>{props.location.state.name}</h2>
            <p>
                {props.location.state.stargazers_count}{' '}
                {num2str(props.location.state.stargazers_count, ['звезда', 'звезды', 'звезд'])}
            </p>
            <a href={props.location.state.html_url}>{props.location.state.html_url}</a>
            <hr />
            <div className={'repository author'}>
                <h3>Автор репозитория</h3>
                {props.location.state.owner.avatar_url ? (
                    <img
                        src={props.location.state.owner.avatar_url}
                        alt={props.location.state.owner.avatar_url}
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
                    {props.location.state.owner.login}
                    <br /> (
                    <a href={props.location.state.owner.html_url}>
                        {props.location.state.owner.html_url}
                    </a>
                    )
                </p>
                <hr />
                {props.location.state.language ? (
                    <p>Используемый язык: {props.location.state.language}</p>
                ) : (
                    ''
                )}
                {props.location.state.description ? (
                    <p>Краткое описание: {props.location.state.description}</p>
                ) : (
                    ''
                )}
                <hr />
                <h3>10 наиболее активных контрибьютера</h3>
                {props.contributors.map((contributor, index) => (
                    <Contributor contributor={contributor} index={index + 1} />
                ))}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        contributors: state.repository.contributors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                loadContributors,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
