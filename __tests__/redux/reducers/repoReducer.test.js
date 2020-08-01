import { repoReducer } from '../../../src/client/redux/reducers/repoReducer';
import { initialState } from '../../../src/client/redux/store/initialState';
import {
    setRepos,
    setContributors,
    setCurrentRepository,
} from '../../../src/client/redux/actions/repoActions';

describe('repoReducer', () => {
    test('setRepos should works correctly', () => {
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
        const expectedState = { ...initialState.repository, repos, totalCount: repos.length };
        expect(repoReducer(initialState.repository, setRepos(repos, repos.length))).toEqual(
            expectedState
        );
    });
    test('setContributors should works correctly', () => {
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
        const expectedState = { ...initialState.repository, contributors };
        expect(repoReducer(initialState.repository, setContributors(contributors))).toEqual(
            expectedState
        );
    });
    test('setCurrentRepository should works correctly', () => {
        const repository = {
            name: 'name1',
            id: 1,
        };
        const expectedState = { ...initialState.repository, currentRepository: repository };
        expect(repoReducer(initialState.repository, setCurrentRepository(repository))).toEqual(
            expectedState
        );
    });
});
