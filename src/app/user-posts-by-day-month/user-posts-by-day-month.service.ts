import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPostsByDayMonthService {
  private url = 'http://localhost:3000/user/posts';

  constructor(private http: HttpClient) {}

  getUserPostsByDayAndMonth(month: number, day: number): Observable<any> {
    return this.http.get(`${this.url}/${month}/${day}`);
  }
}
