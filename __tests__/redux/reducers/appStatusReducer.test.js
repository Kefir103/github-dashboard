import { appStatusReducer } from '../../../src/client/redux/reducers/appStatusReducer';
import {
    catchError,
    changeLoadingStatus,
} from '../../../src/client/redux/actions/appStatusActions';
import { initialState } from '../../../src/client/redux/store/initialState';

describe('appStatusReducer', () => {
    test('on catchError should return correct state', () => {
        const catchedError = {
            status: 403,
            statusText: 'statusText',
        };
        const expectedState = { ...initialState.appStatus, catchedError };
        expect(appStatusReducer(initialState.appStatus, catchError(catchedError))).toEqual(
            expectedState
        );
    });
    test('on changeLoadingStatus should return correct state', () => {
        const isLoading = false;
        const expectedState = { ...initialState.appStatus, isLoading };
        expect(appStatusReducer(initialState.appStatus, changeLoadingStatus(isLoading))).toEqual(
            expectedState
        );
    });
});
