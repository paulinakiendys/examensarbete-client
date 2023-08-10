import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RandomPublicPostsService {
  private url = 'http://localhost:3000/guest/public-posts/random';

  constructor(private http: HttpClient) {}

  getRandomPublicPosts(page: number): Observable<any> {
    return this.http.get<any>(`${this.url}/?page=${page}`);
  }
}
