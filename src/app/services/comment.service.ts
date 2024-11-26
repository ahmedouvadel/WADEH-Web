import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment'; // Utilisation du modèle Comment
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = 'http://localhost:8080/api/comments'; // Assurez-vous que l'URL correspond à celle de votre API backend

  constructor(private http: HttpClient,
    private userService:UserService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token'); // Retrieve token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Récupérer tous les commentaires
  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Récupérer un commentaire par ID
  getCommentById(id: number|any): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // Récupérer les commentaires par contentId
  getCommentsByContentId(contentId: number|any): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/content/${contentId}`, { headers: this.getHeaders() });
  }

  // Créer un nouveau commentaire
  createComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment, { headers: this.getHeaders() });
  }

  /* // Mettre à jour un commentaire
  updateComment(id: number|any, comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/${id}`, comment, { headers: this.getHeaders() });
  }

  // Supprimer un commentaire
  deleteComment(id: number|any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  } */

    updateComment(id: number|undefined, comment: Comment): Observable<Comment> {
      const userId = this.userService.getCurrentUserId();
      return this.http.put<Comment>(`${this.apiUrl}/${id}?userId=${userId}`, comment, {
        headers: this.getHeaders(),
      });
    }

    deleteComment(id: number | undefined): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`, {
        headers: this.getHeaders(),
      });
    }


}
