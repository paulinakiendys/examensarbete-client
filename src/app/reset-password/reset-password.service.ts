import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  resetPassword(
    resetToken: string | null,
    newPassword: string
  ): Observable<any> {
    return this.http.post(`${this.url}/reset-password/${resetToken}`, { newPassword });
  }
}
