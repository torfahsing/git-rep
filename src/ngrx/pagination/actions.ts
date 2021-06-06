import { createAction, props } from "@ngrx/store";

export const setSelectedPage = createAction('[Page] Select page', props<{ payload: number}>());
export const currentGitPageStatus = createAction('[Page] Current Git page loaded', props<{ payload: {currentPage: number, itemCount: number }}>());
export const totalItemCount = createAction('[Page] Total item count', props<{ payload: number}>());
