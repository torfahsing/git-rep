import { createAction, props } from "@ngrx/store";
import { RepositoryItem } from "src/models";


export const load = createAction('[GitRep] Load', props<{ payload: number}>());
export const preLoad = createAction('[GitRep] PreLoad', props<{ payload: number}>());
export const loaded = createAction('[GitRep] Loaded', props<{ payload: RepositoryItem[]}>());