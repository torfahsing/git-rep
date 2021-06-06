import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "./app.state";
import { gitRepositoryReducer } from "./git-repositories/reducer";
import { paginationReducer } from "./pagination/reducer";

export const appReducers: ActionReducerMap<IAppState, any> = {
    repository: gitRepositoryReducer,
    pagination: paginationReducer
}