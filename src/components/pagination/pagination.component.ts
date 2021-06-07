import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { IAppState } from 'src/ngrx/app.state';
import { Pagination } from 'src/ngrx/pagination';
import { faArrowLeft, faArrowRight, faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() numberOfButtons: number = 10;
  @Input() lastPage: number = 50;
  @Input() itemsPerPage = 20;
  @Input() totalItemCount =  0;

  private get pages(): number[] { return Array.from(Array(this.numberOfButtons), (e,i)=>i+1); }

  public currPage$ = new BehaviorSubject<number>(1);
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;
  
  constructor(private store: Store<IAppState>) { 

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

  pagenumbers() {
    const floored = Math.floor(this.currPage$.value / this.numberOfButtons);

    const pageFactor =  (this.currPage$.value % this.numberOfButtons === 0 ? (floored - 1) : floored) * this.numberOfButtons;
    return this.pages.map(i => i + pageFactor);
  }

}
