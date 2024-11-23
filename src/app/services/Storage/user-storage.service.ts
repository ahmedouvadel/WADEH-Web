import { Injectable } from '@angular/core';

const TOKEN = 'ecom-token';
const USER = 'ecom-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() { }

  public saveToken(token: string): void {
    console.log(`Saving token: ${token}`);
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);

  }

  public saveUser(user: string): void {
    console.log(`Saving user: ${JSON.stringify(user)}`);
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));

  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }
  public getTokenAuth(): string {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return  JSON.parse(localStorage.getItem(USER));
  }
  public getUserAuth(): any {
    const userString: string | null = window.localStorage.getItem(USER);
    return userString ? JSON.parse(userString) : null;
  }

  static getUserId(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
  }
  return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) {
      return '';
  }
  return user.role;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken === null ){
      return false
    }
    const role: string = this.getUserRole();
    return role == 'Admin'
  }

  static isAgentLoggedIn(): boolean {
    if(this.getToken === null ){
      return false
    }
    const role: string = this.getUserRole();
    return role == 'Agent'
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
