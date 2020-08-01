import configureMockStore from 'redux-mock-store';
import {
    setCurrentPage,
    getCurrentPage,
    getSearchText,
    setSearchText,
} from '../../../src/client/redux/actions/filterActions';
import * as Types from '../../../src/client/redux/actions/actionTypes';
import { initialState } from '../../../src/client/redux/store/initialState';

const mockStore = configureMockStore();

describe('filterActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('setCurrentPage should works correctly', () => {
        const page = 1;
        const expectedAction = {
            type: Types.FILTER.SET_CURRENT_PAGE,
            payload: page,
        };
        store.dispatch(setCurrentPage(page));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('getCurrentPage should works correctly', () => {
        const expectedAction = {
            type: Types.FILTER.GET_CURRENT_PAGE,
        };
        store.dispatch(getCurrentPage());
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('getSearchText should works correctly', () => {
        const expectedAction = {
            type: Types.FILTER.GET_SEARCH_TEXT,
        };
        store.dispatch(getSearchText());
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
    test('setSearchText should works correctly', () => {
        const searchText = 'searchText';
        const expectedAction = {
            type: Types.FILTER.SET_SEARCH_TEXT,
            payload: searchText,
        };
        store.dispatch(setSearchText(searchText));
        expect(store.getActions()[0]).toEqual(expectedAction);
    });
});
