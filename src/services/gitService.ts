import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Repositories } from 'src/models';




@Injectable({
  providedIn: 'root',
})
export class GitRepositoryService {
  private API_PATH = 'https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100';

  constructor(private http: HttpClient) {}

  getRepositories(page: number = 1): Observable<Repositories> {
    const pageQuery = `&page=${page}`;
  
    return this.http
      .get<Repositories>(`${this.API_PATH}${pageQuery}`)
        .pipe(map(r =>({ ...r, fromPagenr: page })));
  }
}
