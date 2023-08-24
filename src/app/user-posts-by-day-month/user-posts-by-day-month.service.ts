import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserPostsByDayMonthService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserPostsByDayAndMonth(month: number, day: number): Observable<any> {
    return this.http.get(`${this.url}/user/posts/${month}/${day}`);
  }
}
