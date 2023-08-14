import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  private url = 'http://localhost:3000/signup';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<any> {
    return this.http
      .post<{ status: string; data: any }>(`${this.url}`, {
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
