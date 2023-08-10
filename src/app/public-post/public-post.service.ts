import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicPostService {
  private url = 'http://localhost:3000/guest/public-posts';

  constructor(private http: HttpClient) {}

  getPublicPost(publicPostId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${publicPostId}`);
  }
}

