import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAppState } from 'src/ngrx/app.state';
import { GitRepository } from 'src/ngrx/git-repositories';
import { IRepoTable } from 'src/ngrx/git-repositories/selectors';
import { Pagination } from 'src/ngrx/pagination';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableData$!: Observable<IRepoTable[] | null>;
  @Input() totalItemCount: number = 0;
  public itemsPerPage: number = environment.pageSize;

  public currPage$ = new BehaviorSubject<number>(1);
  
  public totNumItems$!: Observable<number>;

  private pages: number[] = Array.from(Array(10), (e,i)=>i+1);
  constructor(private store: Store<IAppState>) { 
    this.totNumItems$ = this.store.select(GitRepository.getNumberOfItemsLoaded);

  }

  
  get currentPage()  {
    return this.currPage$.value;
  }

  nextPage() {
    const next = this.currPage$.value + 1;
    this.selectPage(next);
  }

  prevPage() {
    const prev = this.currPage$.value - 1;
    this.selectPage(prev);
  }
  selectPage(page: number) {
    this.store.dispatch(Pagination.setSelectedPage({ payload: page}));
    this.currPage$.next(page);
  }
  ngOnInit(): void {
    this.store.dispatch(Pagination.setSelectedPage({ payload: 1}));
  }

  goToPage(page: number) {
    
    if(page <= Math.ceil(this.totalItemCount / this.itemsPerPage)) {
      this.selectPage(page);
    }
  }
  disablePrevious() {

    return this.currPage$.value === 1;
  }

  disableNext() {
    return (this.currPage$.value === Math.ceil(this.totalItemCount / this.itemsPerPage) );
  }
  fromCount() {
    return (this.currPage$.value * this.itemsPerPage) - (this.itemsPerPage - 1);
  }

  toCount() {
    return (this.currPage$.value * this.itemsPerPage);
  }

  pagenumbers() {
    const floored = Math.floor(this.currPage$.value / 10);

    const pageFactor =  (this.currPage$.value % 10 === 0 ? (floored - 1) : floored) * 10;
    return this.pages.map(i => i + pageFactor);
  }

}
