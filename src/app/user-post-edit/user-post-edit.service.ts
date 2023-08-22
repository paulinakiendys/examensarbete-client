import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserPostEditService {
  private url = 'http://localhost:3000/user/posts';

  constructor(private http: HttpClient) {}

  getUserPost(userPostId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${userPostId}`);
  }

  editUserPost(userPostId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}/${userPostId}`, formData);
  }
}
