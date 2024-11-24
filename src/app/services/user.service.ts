import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = window.localStorage.getItem('token'); // Retrieve token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Enregistre un nouvel utilisateur
   * @param user - Les données de l'utilisateur
   * @returns Observable<User>
   */
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}register`, user, { headers: this.getHeaders() });
  }

  /**
   * Authentifie un utilisateur et stocke les données dans localStorage
   * @param user - Les données de l'utilisateur
   * @returns Observable<User>
   */
  /* loginUser(user: User): Observable<User> {
    return new Observable((observer) => {
      this.http.post<User>(`${this.apiUrl}login`, user).subscribe({
        next: (loggedInUser) => {
          // Stocker les informations utilisateur dans le localStorage
          localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
          observer.next(loggedInUser);
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => observer.complete()
      });
    });
  } */

  /**
   * Récupère tous les utilisateurs
   * @returns Observable<User[]>
   */
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  /**
   * Met à jour les informations d'un utilisateur
   * @param id - L'identifiant de l'utilisateur
   * @param user - Les données à mettre à jour
   * @returns Observable<User>
   */
  editUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}${id}`, user, { headers: this.getHeaders() });
  }

  /**
   * Supprime un utilisateur par son ID
   * @param id - L'identifiant de l'utilisateur
   * @returns Observable<void>
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`, { headers: this.getHeaders() });
  }

  /**
   * Déconnecte l'utilisateur en supprimant ses données du localStorage
   */
  /* logout(): void {
    localStorage.removeItem('currentUser');
  } */

  /**
   * Vérifie si un utilisateur est authentifié
   * @returns boolean
   */
  /* isAuthenticated(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser !== null;
  } */

  /**
   * Récupère l'utilisateur actuellement connecté depuis le localStorage
   * @returns User | null
   */
  /* getCurrentUser(): User | null {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
  } */

    getCurrentUserId(): number {
      const userId = localStorage.getItem('userId'); // Retrieves 'userId' as a string or null
      if (userId) {
        return Number(userId); // Convert the string to a number
      }
      throw new Error('User ID not found in localStorage'); // Handle the null case
    }

}
