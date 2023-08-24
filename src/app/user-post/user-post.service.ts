import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserPostService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserPost(userPostId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/user/posts/${userPostId}`);
  }

  deleteUserPost(userPostId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/user/posts/${userPostId}`);
  }
}
