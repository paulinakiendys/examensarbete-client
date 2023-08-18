import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileUpdateService {
  private url = 'http://localhost:3000/user/profile';

  constructor(private http: HttpClient) { }

  userProfileUpdate(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}`, formData);
  }
}
