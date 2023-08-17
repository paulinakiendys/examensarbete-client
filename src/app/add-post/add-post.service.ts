import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private url = 'http://localhost:3000/user/posts';

  constructor(private http: HttpClient) {}

  addPost(formData: FormData) {
    return this.http.post<any>(this.url, formData);
  }
}
