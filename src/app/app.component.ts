import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { RepositoryItem } from 'src/models';
import { IAppState } from 'src/ngrx/app.state';
import { GitRepository } from 'src/ngrx/git-repositories';
import { IRepoTable } from 'src/ngrx/git-repositories/selectors';
import { DataSourceService } from 'src/services/datasource.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public tableData$: Observable<RepositoryItem[]>;
  public totalItemCount$: Observable<number>;
  constructor(private store: Store<IAppState>, private datasource: DataSourceService) {
    this.tableData$ = this.datasource.data$;
    this.totalItemCount$ = this.datasource.totalItems$;
  };
}
