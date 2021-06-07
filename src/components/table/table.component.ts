import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAppState } from 'src/ngrx/app.state';
import { GitRepository } from 'src/ngrx/git-repositories';
import { environment } from 'src/environments/environment';
import { RepositoryItem } from 'src/models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() tableData$!: Observable<RepositoryItem[] | null>;
  @Input() totalItemCount: number = 0;
  public itemsPerPage: number = environment.pageSize;

  public totNumItems$!: Observable<number>;

  constructor(private store: Store<IAppState>) { 
    this.totNumItems$ = this.store.select(GitRepository.getNumberOfItemsLoaded);

  }
}
