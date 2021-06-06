import { createFeatureSelector, createSelector } from "@ngrx/store";
import { gitRepositoryEntityAdapter, IGitRepositoriesState } from "./reducer";


const selectState = createFeatureSelector<IGitRepositoriesState>('repository');

export const { selectEntities, selectIds, selectAll } = gitRepositoryEntityAdapter.getSelectors(selectState);

export const getTableData = createSelector(
    selectAll,
    (all) => {
        return all.map(a => ({ 
            name: a.name, 
            full_name: a.full_name, 
            homepage: a.homepage, 
            description: a.description, 
            updated_at: a.updated_at,
            score: a.score,
            stargazers_count: a.stargazers_count
        } as IRepoTable))
    }
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