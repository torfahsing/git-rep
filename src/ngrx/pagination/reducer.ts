import { createReducer, on } from "@ngrx/store";
import * as A from './actions';


 
export const initialState: IPagination = { 
    previousPage: 0,
    selectedPage: 0,
    currentGitPage: 0,
    previousGitPage: 0,
    totalItemCount: 0
 };
 
export interface IPaginationInfo{pagination: IPagination}

export const paginationReducer = createReducer(initialState,
    on(A.currentGitPageStatus, (state, { payload }) => ({
        ...state,
        previousGitPage: state.currentGitPage,
        currentGitPage: payload.currentPage,
        ItemCount: payload.itemCount,
       
      })),
    on(A.setSelectedPage, (state, {payload}) => ({
        ...state,
        previousPage: state.selectedPage,
        selectedPage: payload
    })),
);

export interface IPagination {
    previousPage: number;
    selectedPage: number;
    currentGitPage: number;
    previousGitPage: number;
    totalItemCount: number;
}