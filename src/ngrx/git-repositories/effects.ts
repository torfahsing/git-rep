import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, switchMap } from "rxjs/operators";
import { Repositories } from "src/models";
import { GitRepositoryService } from "src/services/gitService";
import { Pagination } from "../pagination";
import * as A from './actions'

@Injectable() 
export class GitRepositoryEffects {
    constructor(private api: GitRepositoryService, private readonly actions$: Actions) {}

    load$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(A.load),
            mergeMap((action) => this.api.getRepositories(action.payload)),
            switchMap(payload => [
                A.loaded({payload: payload?.items}),
                Pagination.currentGitPageStatus({payload: {currentPage: payload.fromPagenr, itemCount: payload.total_count}}),
            ])
        );
    });
}