import fetchMock from 'fetch-mock-jest';
import {
    setCurrentRepository,
    setContributors,
    setRepos,
    loadContributors,
    loadCurrentRepository,
    loadRepos,
} from '../../../src/client/redux/actions/repoActions';
import * as Types from '../../../src/client/redux/actions/actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../../src/client/redux/store/initialState';

const mockStore = configureMockStore([thunk]);

describe('repoActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    afterEach(() => {
        fetchMock.restore({
            sticky: true,
        });
    });
    test('setCurrentRepository should be called correctly', () => {
        const repository = {
            name: 'name',
            id: 1,
        };
        const expectedAction = {
            type: Types.REPO_INFO.SET_CURRENT_REPOSITORY,
            payload: {
                repository,
            },
        };
        store.dispatch(setCurrentRepository(repository));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setRepos should be called correctly', () => {
        const repos = [
            {
                name: 'name1',
                id: 1,
            },
            {
                name: 'name2',
                id: 2,
            },
            {
                name: 'name3',
                id: 3,
            },
        ];
        const expectedAction = {
            type: Types.REPO_INFO.SET_REPOS,
            payload: {
                repos,
                totalCount: repos.length,
            },
        };
        store.dispatch(setRepos(repos, repos.length));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setContributors should be called correctly', () => {
        const contributors = [
            {
                name: 'name1',
                id: 1,
            },
            {
                name: 'name2',
                id: 2,
            },
            {
                name: 'name3',
                id: 3,
            },
        ];
        const expectedAction = {
            type: Types.REPO_INFO.SET_CONTRIBUTORS,
            payload: {
                contributors,
            },
        };
        store.dispatch(setContributors(contributors));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('loadContributors should works correctly', () => {
        const contributors = [
            {
                name: 'name1',
                id: 1,
            },
            {
                name: 'name2',
                id: 2,
            },
            {
                name: 'name3',
                id: 3,
            },
        ];
        const url = 'https://api.github.com/repos/company/owner/contributors';
        fetchMock.get(`${url}?per_page=10`, {
            body: contributors,
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            { type: Types.REPO_INFO.SET_CONTRIBUTORS, payload: { contributors: contributors } },
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: false } },
            { type: Types.APP_STATUS.CATCHED_ERROR, payload: { catchedError: null } },
        ];
        return store.dispatch(loadContributors(url)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadContributors should catch error correctly', () => {
        const url = 'https://api.github.com/repos/company/owner/contributors';
        fetchMock.get(`${url}?per_page=10`, {
            throws: {
                status: 403,
                statusText: 'statusText',
            },
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            {
                type: Types.APP_STATUS.CATCHED_ERROR,
                payload: {
                    catchedError: {
                        status: 403,
                        statusText: 'statusText',
                    },
                },
            },
        ];
        return store.dispatch(loadContributors(url)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadCurrentRepository should works correctly', () => {
        const repositoryName = 'react';
        const repository = {
            name: 'react',
            id: 1,
        };
        fetchMock.get(
            `https://api.github.com/search/repositories?q=${repositoryName}&page=1&per_page=1`,
            {
                body: {
                    items: [{ ...repository }],
                },
                status: 200,
            }
        );
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            { type: Types.REPO_INFO.SET_CURRENT_REPOSITORY, payload: { repository: repository } },
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: false } },
            { type: Types.APP_STATUS.CATCHED_ERROR, payload: { catchedError: null } },
        ];
        return store.dispatch(loadCurrentRepository(repositoryName)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadCurrentRepository should catch error correctly', () => {
        const repositoryName = 'react';
        fetchMock.get(
            `https://api.github.com/search/repositories?q=${repositoryName}&page=1&per_page=1`,
            {
                throws: {
                    status: 403,
                    statusText: 'statusText',
                },
            }
        );
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            {
                type: Types.APP_STATUS.CATCHED_ERROR,
                payload: {
                    catchedError: {
                        status: 403,
                        statusText: 'statusText',
                    },
                },
            },
        ];
        return store.dispatch(loadCurrentRepository(repositoryName)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadRepos should work correctly with searchText and page', () => {
        const page = 5;
        const searchText = 'searchText';
        const url = `https://api.github.com/search/repositories?q=${searchText}&sort=stars&order=desc&page=${page}&per_page=10`;
        const repos = [
            {
                name: 'name1',
                id: 1,
            },
            {
                name: 'name2',
                id: 2,
            },
            {
                name: 'name3',
                id: 3,
            },
        ];
        fetchMock.get(url, {
            body: {
                items: repos,
                total_count: repos.length,
            },
            status: 200,
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            {
                type: Types.REPO_INFO.SET_REPOS,
                payload: { repos: repos, totalCount: repos.length },
            },
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: false } },
            { type: Types.APP_STATUS.CATCHED_ERROR, payload: { catchedError: null } },
        ];
        return store.dispatch(loadRepos(searchText, page)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadRepos should work correctly with searchText and without page', () => {
        const searchText = 'searchText';
        const url = `https://api.github.com/search/repositories?q=${searchText}&sort=stars&order=desc&page=1&per_page=10`;
        const repos = [
            {
                name: 'name1',
                id: 1,
            },
            {
                name: 'name2',
                id: 2,
            },
            {
                name: 'name3',
                id: 3,
            },
        ];
        fetchMock.get(url, {
            body: {
                items: repos,
                total_count: repos.length,
            },
            status: 200,
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            {
                type: Types.REPO_INFO.SET_REPOS,
                payload: { repos: repos, totalCount: repos.length },
            },
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: false } },
            { type: Types.APP_STATUS.CATCHED_ERROR, payload: { catchedError: null } },
        ];
        return store.dispatch(loadRepos(searchText)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadRepos should work correctly without searchText and page', () => {
        const url = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=10`;
        const repos = [
            {
                name: 'name1',
                id: 1,
            },
            {
                name: 'name2',
                id: 2,
            },
            {
                name: 'name3',
                id: 3,
            },
        ];
        fetchMock.get(url, {
            body: {
                items: repos,
                total_count: repos.length,
            },
            status: 200,
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            {
                type: Types.REPO_INFO.SET_REPOS,
                payload: { repos: repos, totalCount: repos.length },
            },
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: false } },
            { type: Types.APP_STATUS.CATCHED_ERROR, payload: { catchedError: null } },
        ];
        return store.dispatch(loadRepos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    test('loadRepos should catch error correctly', () => {
        const url = `https://api.github.com/search/repositories?q=stars:>1&sort=stars&order=desc&page=1&per_page=10`;
        fetchMock.get(url, {
            throws: {
                status: 403,
                statusText: 'statusText',
            },
        });
        const expectedActions = [
            { type: Types.APP_STATUS.CHANGE_LOAD_STATUS, payload: { isLoading: true } },
            {
                type: Types.APP_STATUS.CATCHED_ERROR,
                payload: {
                    catchedError: {
                        status: 403,
                        statusText: 'statusText',
                    },
                },
            },
        ];
        return store.dispatch(loadRepos()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
