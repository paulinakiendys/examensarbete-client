import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminPostService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPendingPost(pendingPostId: string): Observable<any> {
    return this.http.get<any>(`${this.url}/${pendingPostId}`);
  }

  approvePendingPost(pendingPostId: string): Observable<any> {
    const approveUrl = `${this.url}/${pendingPostId}/approve`;
    return this.http.put<any>(approveUrl, {});
  }

  denyPendingPost(pendingPostId: string): Observable<any> {
    const denyUrl = `${this.url}/posts/pending/${pendingPostId}/deny`;
    return this.http.delete<any>(denyUrl);
  }
}
