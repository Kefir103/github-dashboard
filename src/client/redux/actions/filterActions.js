import * as Types from './actionTypes';

export function setCurrentPage(page) {
    return {
        type: Types.FILTER.SET_CURRENT_PAGE,
        payload: page,
    };
}

export function getCurrentPage() {
    return {
        type: Types.FILTER.GET_CURRENT_PAGE,
    };
}

export function setSearchText(text) {
    return {
        type: Types.FILTER.SET_SEARCH_TEXT,
        payload: text,
    };
}

export function getSearchText() {
    return {
        type: Types.FILTER.GET_SEARCH_TEXT,
    };
}
