import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewestPublicPostsService {
  private baseUrl = 'http://localhost:3000/guest/public-posts/sorted/newest';

  constructor(private http: HttpClient) { }

  getNewestPublicPosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}`);
  }
}
