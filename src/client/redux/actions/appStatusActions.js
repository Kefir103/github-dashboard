import * as Types from './actionTypes';

export function changeLoadingStatus(isLoading) {
    return {
        type: Types.APP_STATUS.CHANGE_LOAD_STATUS,
        payload: {
            isLoading: isLoading,
        },
    };
}

export function catchError(error) {
    return {
        type: Types.APP_STATUS.CATCHED_ERROR,
        payload: {
            catchedError: error,
        },
    };
}
