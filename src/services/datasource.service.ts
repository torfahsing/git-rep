
import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, max, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RepositoryItem } from 'src/models';
import { IAppState } from 'src/ngrx/app.state';
import { GitRepository } from 'src/ngrx/git-repositories';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class DataSourceService {
  
  public data$: Observable<RepositoryItem[]>;
  public totalItems$: Observable<number>;

  constructor(private store: Store<IAppState>) {
    const gitData$ = this.store.select(GitRepository.getTableData);
    const selectedPage$ = this.store.select('pagination').pipe(map(p => p.selectedPage));
    const currentGitPage$ = this.store.select('pagination').pipe(map(p => p.currentGitPage));
    const { pageSize, gitPageSize} = environment;

    selectedPage$
      .pipe(
        untilDestroyed(this),
        withLatestFrom(gitData$)
      )
      .subscribe(([ selectedPage, data]) => { 
        //check i data is fetched allready
        const newDataLength = (selectedPage) * pageSize;

        if(data.length < newDataLength) {
          const nextGitPage = calcGitPage(selectedPage, pageSize, gitPageSize);
          this.store.dispatch(GitRepository.load({payload: nextGitPage}));

          let callCount = nextGitPage;
          const maxCalls = callCount + 1 < 10 ? callCount + 1 : 10;
          const loadRest = setInterval(function() {
    
            if (callCount >= maxCalls) {
              clearInterval(loadRest);
            }
            callCount ++;
            store.dispatch(GitRepository.load({payload: callCount}));
            
          }, 2000);
        }
      });

    this.totalItems$ = of(1000); // Git only allows 1000 first when not authorized
    // this.store.select(GitRepository.getTableData).pipe(
    //   map(p => p.length)
    // );

    this.data$ = combineLatest([gitData$, selectedPage$, currentGitPage$])
      .pipe(
        filter(([d, c, cgp]) => cgp > 0),
        map(([data, currPage, currentGitPage]) => {
          const fromIndex = (((currPage) * pageSize) - pageSize) ;
          const toIndex = fromIndex + pageSize;

          return (data || []).slice(fromIndex, toIndex);
        }) 
      );

  }
}

const calcGitPage = (currPage: number, pageSize: number, gitPageSize: number ) => Math.ceil((currPage * pageSize) / gitPageSize);
