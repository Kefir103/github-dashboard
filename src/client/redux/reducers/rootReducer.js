import { combineReducers } from 'redux';
import { repoReducer } from './repoReducer';
import { filterReducer } from './filterReducer';
import { appStatusReducer } from './appStatusReducer';

export const rootReducer = combineReducers({
    repository: repoReducer,
    filter: filterReducer,
    appStatus: appStatusReducer,
});
