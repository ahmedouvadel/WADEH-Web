import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private apiUrl = 'http://localhost:8080/api/contents';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token'); // Retrieve token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllContents(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getContentById(id: number): Observable<Content> {
    return this.http.get<Content>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createContent(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, content, { headers: this.getHeaders() });
  }

  /* updateContent(id: number, content: Content): Observable<Content> {
    return this.http.put<Content>(`${this.apiUrl}/${id}`, content, { headers: this.getHeaders() });
  }
   deleteContent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  } */

    updateContent(id: number, content: Partial<Content>): Observable<Content> {
      return this.http.put<Content>(`${this.apiUrl}/${id}`, content, {
        headers: this.getHeaders(),
      });
    }

    deleteContent(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, {
        headers: this.getHeaders(),
      });
    }

}
