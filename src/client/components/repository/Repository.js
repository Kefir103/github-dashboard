import React, { useEffect } from 'react';
import history from '../../history';
import { num2str } from '../../localeFunctions';
import Contributor from './Contributor';
import { bindActionCreators } from 'redux';
import {
    loadContributors,
    loadCurrentRepository,
    setCurrentRepository,
} from '../../redux/actions/repoActions';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Error from '../Error';

export function Repository(props) {
    useEffect(() => {
        if (!props.location.state || !props.repository) {
            props.actions.loadCurrentRepository(props.match.params.name);
            props.actions.loadContributors(
                `https://api.github.com/repos/${props.match.params.name}/${props.match.params.name}/contributors`
            );
        } else {
            props.actions.setCurrentRepository(props.location.state);
            props.actions.loadContributors(props.location.state.contributors_url);
        }
    }, []);

    return (
        <>
            {!props.catchedError ? (
                <>
                    {!props.isLoading ? (
                        <div className={'app-container repository'}>
                            <div
                                className={'back-button'}
                                onClick={() => {
                                    history.push('/');
                                }}>
                                <p>&lArr; Назад</p>
                            </div>
                            <h2>{props.repository.name}</h2>
                            <p>
                                {props.repository.stargazers_count}{' '}
                                {num2str(props.repository.stargazers_count, [
                                    'звезда',
                                    'звезды',
                                    'звезд',
                                ])}
                            </p>
                            <a href={props.repository.html_url}>{props.repository.html_url}</a>
                            <hr />
                            {props.repository.owner ? (
                                <div className={'repository author'}>
                                    <h3>Автор репозитория</h3>
                                    {props.repository.owner.avatar_url ? (
                                        <img
                                            src={props.repository.owner.avatar_url}
                                            alt={props.repository.owner.avatar_url}
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
                                        {props.repository.owner.login}
                                        <br />
                                        <a href={props.repository.owner.html_url}>
                                            {props.repository.owner.html_url}
                                        </a>
                                    </p>
                                    <hr />
                                </div>
                            ) : (
                                ''
                            )}
                            {props.repository.language ? (
                                <p>Используемый язык: {props.repository.language}</p>
                            ) : (
                                ''
                            )}
                            {props.repository.description ? (
                                <p>Краткое описание: {props.repository.description}</p>
                            ) : (
                                ''
                            )}
                            <hr />
                            <h3>10 наиболее активных контрибьютеров</h3>
                            {props.contributors.map((contributor, index) => (
                                <Contributor contributor={contributor} index={index + 1} />
                            ))}
                        </div>
                    ) : (
                        <Loading />
                    )}
                </>
            ) : (
                <Error />
            )}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        contributors: state.repository.contributors,
        repository: state.repository.currentRepository,
        isLoading: state.appStatus.isLoading,
        catchedError: state.appStatus.catchedError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                loadContributors,
                loadCurrentRepository,
                setCurrentRepository,
            },
            dispatch
        ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Repository);
