import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { RepositoryItem } from "src/models";
import * as A from './actions';

export const gitRepositoryEntityAdapter = createEntityAdapter<RepositoryItem>();

export interface IGitRepositoriesState extends EntityState<RepositoryItem>{};

export const initialState: IGitRepositoriesState = {
    ...gitRepositoryEntityAdapter.getInitialState()
}

export interface IGitRepository{repository: IGitRepositoriesState}
export const gitRepositoryReducer = createReducer(initialState,
    on(A.loaded, (state, { payload }) => gitRepositoryEntityAdapter.addMany(payload, state))    
);
