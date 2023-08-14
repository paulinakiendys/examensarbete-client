import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OldestPublicPostsService {
  private baseUrl = 'http://localhost:3000/guest/public-posts/sorted/oldest';

  constructor(private http: HttpClient) { }

  getOldestPublicPosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?page=${page}`);
  }
}
