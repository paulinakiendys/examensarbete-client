import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPostsService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPendingPosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/admin/posts/pending?page=${page}`);
  }
}
