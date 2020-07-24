import { combineReducers } from "redux";
import { repoReducer } from "./repoReducer";
import { filterReducer } from "./filterReducer";

export const rootReducer = combineReducers({
    repository: repoReducer,
    filter: filterReducer
});
