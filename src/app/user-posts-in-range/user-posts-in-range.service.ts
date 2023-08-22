import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserPostsInRangeService {
  private url = 'http://localhost:3000/user/posts/range';

  constructor(private http: HttpClient) { }

  getUserPostsInRange(startYear: number, endYear: number, page: number): Observable<any> {
    const url = `${this.url}/${startYear}/${endYear}?page=${page}`;
    return this.http.get(url);
  }
}
