import * as Types from '../actions/actionTypes';
import { changeLoadingStatus, catchError } from './appStatusActions';

export function setRepos(repos, totalCount) {
    return {
        type: Types.REPO_INFO.SET_REPOS,
        payload: {
            repos: repos,
            totalCount: totalCount,
        },
    };
}

export function setContributors(contributors) {
    return {
        type: Types.REPO_INFO.SET_CONTRIBUTORS,
        payload: {
            contributors: contributors,
        },
    };
}

export function setCurrentRepository(repository) {
    return {
        type: Types.REPO_INFO.SET_CURRENT_REPOSITORY,
        payload: {
            repository: repository,
        },
    };
}

export function loadRepos(searchText, page) {
    let url;
    if (!page) {
        page = 1;
    }
    url = `https://api.github.com/search/repositories?q=${searchText}&sort=stars&order=desc&page=${page}&per_page=10`;

    if (!searchText) {
        url = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=10`;
    }
    return (dispatch) => {
        let repos = [];
        let totalCount = 0;
        dispatch(changeLoadingStatus(true));
        fetch(url, {
            method: 'GET',
        })
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((result) => {
                repos = result.items;
                totalCount = result.total_count;
                dispatch(setRepos(repos, totalCount));
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(null));
            })
            .catch((error) => {
                const { status, statusText, type } = error;
                dispatch(catchError({ status, statusText, type }));
            });
    };
}

export function loadContributors(contributorsUrl) {
    return (dispatch) => {
        dispatch(changeLoadingStatus(true));
        fetch(`${contributorsUrl}?per_page=10`, {
            method: 'GET',
        })
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((result) => {
                dispatch(setContributors(result));
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(null));
            })
            .catch((error) => {
                const { status, statusText, type } = error;
                dispatch(catchError({ status, statusText, type }));
            });
    };
}

export function loadCurrentRepository(repositoryName) {
    return (dispatch) => {
        dispatch(changeLoadingStatus(true));
        fetch(`https://api.github.com/search/repositories?q=${repositoryName}&page=1&per_page=1`)
            .then((response) => (response.ok ? response.json() : Promise.reject(response)))
            .then((result) => {
                dispatch(setCurrentRepository(result.items[0]));
                dispatch(changeLoadingStatus(false));
                dispatch(catchError(null));
            })
            .catch((error) => {
                const { status, statusText, type } = error;
                dispatch(catchError({ status, statusText, type }));
            });
    };
}
