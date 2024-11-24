import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN = 'token';
const USER = 'userId';
const ROLE = 'role'

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor(private route:Router) { }

  public saveToken(token: string): void {
    console.log(`Saving token: ${token}`);
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

/*   public saveUser(user: string): void {
    console.log(`Saving user: ${JSON.stringify(user)}`);
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));

  } */

  static getToken(): any {
    return localStorage.getItem(TOKEN);
  }
  public getTokenAuth(): any {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any {
    return localStorage.getItem(ROLE);
  }
  public getUserAuth(): any {
    const userString: string | null = window.localStorage.getItem(USER);
    return userString;
  }

  static getUserId(): string {
    const userId = this.getUser();
    if (userId == null) {
      return '';
  }
  return userId;
  }

  static getRole(): any {
    return localStorage.getItem(ROLE);
  }

  static getUserRole(): string {
    const ROLE = this.getUser();
    if (ROLE == null) {
      return '';
  }
  return ROLE;
  }

  static isAdminLoggedIn(): boolean {
    if(this.getToken === null ){
      return false
    }
    const role: string = this.getUserRole();
    return role == 'ROLE_ADMIN'
  }

  static isUserLoggedIn(): boolean {
    if(this.getToken === null ){
      return false
    }
    const role: string = this.getUserRole();
    return role == 'ROLE_USER'
  }

  public signOut(): void {
    window.localStorage.clear()
  }

  /* public saveTokenWithUserInfo(token: string, userId: string, role: string): void {
    console.log(`Saving token: ${token}, userId: ${userId}, role: ${role}`);
    window.localStorage.setItem(TOKEN, token);
    const userInfo = { userId, role };
    window.localStorage.setItem(USER, JSON.stringify(userInfo));
  }

  static getUserIdFromToken(): string {
    const user = this.getUser();
    return user ? user.userId : '';
  }

  static getUserRoleFromToken(): string {
    const user = this.getUser();
    return user ? user.role : '';
  }

  static isRoleLoggedIn(roleToCheck: string): boolean {
    const role = this.getUserRoleFromToken();
    return role === roleToCheck;
  } */

}
