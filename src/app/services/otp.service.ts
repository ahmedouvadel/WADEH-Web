import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private baseUrl = 'http://apipd.digital.gov.mr';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const username = 'temp';
    const password = 'te@mp!24';
    const basicAuth = `Basic ${btoa(`${username}:${password}`)}`; // Encode credentials
    return new HttpHeaders({
      Authorization: basicAuth,
      'Content-Type': 'application/json',
    });
  }

  sendOtp(phoneNumber: string, appName: string, lang = 'en'): Observable<any> {
    const url = `${this.baseUrl}/send-msg-otp`;
    const body = {
      phoneNumber,
      appName,
      lang,
      message: 'Votre code OTP est:', // Optional message
    };

    return this.http.post(url, body, { headers: this.getAuthHeaders() });
  }

  verifyOtp(otp: string, verifToken: string): Observable<any> {
    const url = `${this.baseUrl}/verify-msg-otp`;
    const body = {
      otp,
      verifToken,
    };

    return this.http.post(url, body, { headers: this.getAuthHeaders() });
  }
}
