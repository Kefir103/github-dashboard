import * as Types from '../actions/actionTypes';
import { initialState } from '../store/initialState';

export function repoReducer(state = initialState, action) {
    switch (action.type) {
        case Types.REPO_INFO.SET_REPOS: {
            const { repos, totalCount } = action.payload;
            return {
                ...state,
                repos: repos,
                totalCount: totalCount,
            };
        }
        case Types.REPO_INFO.SET_CONTRIBUTORS: {
            const { contributors } = action.payload;
            return {
                ...state,
                contributors: contributors,
            };
        }
        case Types.REPO_INFO.SET_CURRENT_REPOSITORY: {
            const { repository } = action.payload;
            return {
                ...state,
                currentRepository: repository,
            };
        }
        default:
            return state;
    }
}
