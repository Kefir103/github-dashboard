import * as Types from '../actions/actionTypes';
import { initialState } from '../store/initialState';

export function appStatusReducer(state = initialState, action) {
    switch (action.type) {
        case Types.APP_STATUS.CHANGE_LOAD_STATUS: {
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        }
        default: return state;
    }
}
