import * as Types from '../actions/actionTypes';

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
        fetch(url, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('loadRepos', {
                    type: Types.REPO_INFO.LOAD_REPOS,
                    payload: {
                        repos: result.items,
                        totalCount: result.total_count,
                    },
                });
                repos = result.items;
                totalCount = result.total_count;
                dispatch(setRepos(repos, totalCount));
            });
    };
}

export function loadContributors(contributorsUrl) {
    return (dispatch) => {
        fetch(`${contributorsUrl}?per_page=10`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('loadContributors', {
                    type: Types.REPO_INFO.LOAD_CONTRIBUTORS,
                    payload: {
                        contributors: result,
                    },
                });
                dispatch(setContributors(result));
            });
    };
}

export function loadCurrentRepository(repositoryName) {
    return (dispatch) => {
        fetch(`https://api.github.com/search/repositories?q=${repositoryName}&page=1&per_page=1`)
            .then((response) => response.json())
            .then((result) => {
                console.log('loadCurrentRepository', {
                    type: Types.REPO_INFO.LOAD_CURRENT_REPOSITORY,
                    payload: {
                        repository: result.items[0],
                    },
                });
                dispatch(setCurrentRepository(result.items[0]));
            });
    };
}
