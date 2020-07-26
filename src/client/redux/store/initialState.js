export const initialState = {
    appStatus: {
        isLoading: true,
        catchedError: null,
    },
    repository: {
        repos: [],
        totalCount: 0,
        contributors: [],
        currentRepository: null,
    },
    filter: {
        searchText: sessionStorage.getItem('searchText')
            ? sessionStorage.getItem('searchText')
            : '',
        currentPage: sessionStorage.getItem('page') ? Number(sessionStorage.getItem('page')) : 1,
    },
};
