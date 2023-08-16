import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private url = 'http://localhost:3000/reset-password';

  constructor(private http: HttpClient) {}

  resetPassword(
    resetToken: string | null,
    newPassword: string
  ): Observable<any> {
    return this.http.post(`${this.url}/${resetToken}`, { newPassword });
  }
}
