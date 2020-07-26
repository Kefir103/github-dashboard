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
        searchText: '',
        currentPage: 1,
    },
};
