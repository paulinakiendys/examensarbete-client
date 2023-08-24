import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserPostsInRangeService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserPostsInRange(startYear: number, endYear: number, page: number): Observable<any> {
    const url = `${this.url}/user/posts/range/${startYear}/${endYear}?page=${page}`;
    return this.http.get(url);
  }
}
