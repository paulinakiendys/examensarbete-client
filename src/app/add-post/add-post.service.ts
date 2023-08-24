import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addPost(formData: FormData) {
    return this.http.post<any>(`${this.url}/user/posts`, formData);
  }
}
