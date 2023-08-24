import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserPostEditService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserPost(userPostId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/user/posts/${userPostId}`);
  }

  editUserPost(userPostId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}/user/posts/${userPostId}`, formData);
  }
}
