import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post<{ status: string; data: any }>(`${this.url}/signup`, {
        email,
        password,
      })
      .pipe(
        map((response) => response.data),
        catchError((err) => {
          return throwError(err.error.message);
        })
      );
  }
}
