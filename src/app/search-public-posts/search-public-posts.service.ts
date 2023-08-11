import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchPublicPostsService {
  private url = 'http://localhost:3000/guest/public-posts/search';

  constructor(private http: HttpClient) {}

  searchPublicPosts(page: number, query: string): Observable<any> {
    return this.http.get<any>(`${this.url}?page=${page}&query=${query}`);
  }
}
