import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gitRepositoryEntityAdapter, IGitRepositoriesState } from "./reducer";


const selectState = createFeatureSelector<IGitRepositoriesState>('repository');

export const { selectEntities, selectIds, selectAll } = gitRepositoryEntityAdapter.getSelectors(selectState);

export const getTableData = createSelector(
    selectAll,
    (all) => all
)

export const getNumberOfItemsLoaded = createSelector(
    selectIds,
    (ids) => ids.length
)
export interface IRepoTable {
    name: string;
    full_name: string;
    description: string;
    homepage: string;
    updated_at: Date;
    stargazers_count: number;
    score: number;

}