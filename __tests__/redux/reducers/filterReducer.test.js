import { filterReducer } from '../../../src/client/redux/reducers/filterReducer';
import { initialState } from '../../../src/client/redux/store/initialState';
import {
    setSearchText,
    setCurrentPage,
    getSearchText,
    getCurrentPage,
} from '../../../src/client/redux/actions/filterActions';

describe('filterReducer', () => {
    test('setSearchText should works correctly', () => {
        const searchText = 'searchText';
        const expectedState = {
            ...initialState.filter,
            searchText,
        };
        expect(filterReducer(initialState.filter, setSearchText(searchText))).toEqual(
            expectedState
        );
        expect(sessionStorage.getItem('searchText')).toEqual(searchText);
    });
    test('setCurrentPage should works correctly', () => {
        const currentPage = 5;
        const expectedState = {
            ...initialState.filter,
            currentPage,
        };
        expect(filterReducer(initialState.filter, setCurrentPage(currentPage))).toEqual(
            expectedState
        );
        expect(Number(sessionStorage.getItem('page'))).toEqual(currentPage);
    });
});
