export const initialState = {
    appStatus: {
        isLoading: true,
    },
    repository: {
        repos: [],
        totalCount: 0,
        contributors: [],
        currentRepository: {},
    },
    filter: {
        searchText: '',
        currentPage: 1,
    },
};
