import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private url = 'http://localhost:3000/forgot-password';

  constructor(private http: HttpClient) {}

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.url}`, { email });
  }
}
