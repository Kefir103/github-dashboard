import {
    catchError,
    changeLoadingStatus,
} from '../../../src/client/redux/actions/appStatusActions';
import { initialState } from '../../../src/client/redux/store/initialState';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

describe('appStatusActions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({ ...initialState });
    });
    test('catchError should works correctly', () => {
        const catchedError = {
            status: 403,
            statusText: 'statusText',
        };
        const action = {
            type: 'app/catchedError',
            payload: {
                catchedError,
            },
        };
        store.dispatch(catchError(catchedError));
        const receivedAction = store.getActions()[0];
        expect(receivedAction).toEqual(action);
    });
    test('changeLoadingStatus should works correctly', () => {
        const isLoading = true;
        const action = {
            type: 'app/changeLoadingStatus',
            payload: {
                isLoading,
            },
        };
        store.dispatch(changeLoadingStatus(isLoading));
        expect(store.getActions()[0]).toEqual(action);
    });
});
