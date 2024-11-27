import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proposition } from '../models/proposition';

@Injectable({
  providedIn: 'root',
})
export class PropositionService {
  private apiUrl = 'http://localhost:8080/api/propositions';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token');
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  // Create a new proposition with a file
  createProposition(
    title: string,
    userId: number,
    file: File
  ): Observable<Proposition> {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('userId', userId.toString());
    formData.append('file', file);

    return this.http.post<Proposition>(this.apiUrl, formData,  );
  }

  // Get all propositions
  getAllPropositions(): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(this.apiUrl, {
      headers: this.getHeaders(),
    } );
  }

  // Get propositions with status === true
getValidatedPropositions(): Observable<Proposition[]> {
  return this.http.get<Proposition[]>(`${this.apiUrl}/validated`, {
    headers: this.getHeaders(),
  });
}



  // Get propositions by user
  getPropositionsByUser(userId: number): Observable<Proposition[]> {
    return this.http.get<Proposition[]>(`${this.apiUrl}/user/${userId}`,  );
  }

  // Get a single proposition by its ID
  getPropositionById(id: number): Observable<Proposition> {
    return this.http.get<Proposition>(`${this.apiUrl}/${id}`,  );
  }

  updateProposition(
    id: number,
    userId: number,
    updatedProposition: Partial<Proposition> | FormData
  ): Observable<Proposition> {
    const headers =
      updatedProposition instanceof FormData
        ? undefined // Let the browser handle `Content-Type` for FormData
        : { headers: this.getHeaders() };

    return this.http.put<Proposition>(`${this.apiUrl}/${id}`, updatedProposition, {
      ...headers,
      params: new HttpParams().set('userId', userId.toString()),
    });
  }


    /* updateProposition(
      id: number,
      userId: number,
      updatedProposition: Partial<Proposition> | FormData
    ): Observable<Proposition> {
      const headers = updatedProposition instanceof FormData
        ? undefined // Let the browser set `Content-Type` for FormData
        : { headers: this.getHeaders() };

      return this.http.put<Proposition>(
        `${this.apiUrl}/${id}`,
        updatedProposition,
        {
          ...headers,
          params: new HttpParams().set('userId', userId.toString()),
        }
      );
    } */

    downloadFile(fileName: string): Observable<Blob> {
      const apiUrl = `http://localhost:8080/api/propositions/download/${fileName}`;
      return this.http.get(apiUrl, { responseType: 'blob' });
    }



  // Validate a proposition
  validateProposition(id: number): Observable<Proposition> {
    return this.http.patch<Proposition>(
      `${this.apiUrl}/${id}/validate`,
      {},
      {
        headers: this.getHeaders(),
      }
    );
  }

  // Delete a proposition
  deleteProposition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,  );
  }

  /* // Delete a proposition (with ownership check)
  deleteProposition(id: number, userId: number): Observable<void> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      params,
    });
  } */
}
