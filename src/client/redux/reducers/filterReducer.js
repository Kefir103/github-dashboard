import * as Types from '../actions/actionTypes';
import { initialState } from '../store/initialState';

export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case Types.FILTER.SET_CURRENT_PAGE: {
            const page = action.payload;
            sessionStorage.setItem('page', page);
            return {
                ...state,
                currentPage: page,
            };
        }
        case Types.FILTER.GET_CURRENT_PAGE: {
            let page = Number(sessionStorage.getItem('page'));
            if (!page) {
                page = state.currentPage;
            }
            return {
                ...state,
                currentPage: page,
            };
        }
        case Types.FILTER.SET_SEARCH_TEXT: {
            const searchText = action.payload;
            sessionStorage.setItem('searchText', searchText);
            return {
                ...state,
                searchText: searchText,
            };
        }
        case Types.FILTER.GET_SEARCH_TEXT: {
            let searchText = sessionStorage.getItem('searchText');
            if (!searchText) {
                searchText = '';
            }
            return {
                ...state,
                searchText: searchText,
            };
        }
        default:
            return state;
    }
}
