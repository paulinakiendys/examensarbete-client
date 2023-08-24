import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserProfileUpdateService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  userProfileUpdate(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.url}/user/profile`, formData).pipe(
      map((response) => response.data),
      catchError((err) => {
        return throwError(err.error.message);
      })
    );
  }
}
