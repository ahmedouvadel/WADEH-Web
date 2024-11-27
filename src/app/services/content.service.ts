import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Content } from '../models/content';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private apiUrl = 'http://localhost:8080/api/contents';

  constructor(private http: HttpClient) {}

  // Generate headers with the Authorization token
  private getHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token'); // Retrieve token from localStorage
    return token
      ? new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      : new HttpHeaders(); // Return empty headers if no token exists
  }

  // Fetch all contents
  getAllContents(): Observable<Content[]> {
    return this.http.get<Content[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  // Fetch a single content by ID
  getContentById(id: number): Observable<Content> {
    return this.http.get<Content>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  // Create a new content
  createContent(content: Content): Observable<Content> {
    return this.http.post<Content>(this.apiUrl, content, {
      headers: this.getHeaders(),
    });
  }

  // Update an existing content
  updateContent(id: number, content: Partial<Content>): Observable<Content> {
    return this.http.put<Content>(`${this.apiUrl}/${id}`, content, {
      headers: this.getHeaders(),
    });
  }

  // Delete a content by ID
  deleteContent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
