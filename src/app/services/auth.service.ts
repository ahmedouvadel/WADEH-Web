import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {jwtDecode} from "jwt-decode";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserStorageService } from './Storage/user-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlLogin:string="http://localhost:8080/auth/login";
  urlProduction:string | undefined;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); // Reactive auth state
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Observable for components

  isAuthenticated: boolean = false;
  roles:any;
  accessToken: string | any;
  userId:any;
  username: any;

 constructor( private http:HttpClient,
   private route:Router,
   private userStorageService: UserStorageService,
 ) {
  const token = this.userStorageService.getTokenAuth();
     this.authState.next(!!token);
 }

 public login(username: string, password: string) {
   const headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");

   const params = new HttpParams().set("username",username).set("password",password);
   return this.http.post(this.urlLogin, params , {headers} );
 }

 loadProfile(res: any):void {
   this.isAuthenticated=true
   this.accessToken=res['access-token']
   this.userId=res['userId']
   const decodeJwt:any = jwtDecode(this.accessToken)
   this.username=decodeJwt.sub
   this.roles=decodeJwt.scope
   console.log(this.roles,this.username)
   window.localStorage.setItem('username',decodeJwt.sub)
   window.localStorage.setItem('token',this.accessToken)
   window.localStorage.setItem('userId',this.userId)
   window.localStorage.setItem('role',decodeJwt.scope)
   }

   private authState = new BehaviorSubject<boolean>(false);
   authState$ = this.authState.asObservable();


   logout(): void {
     this.userStorageService.signOut(); // Clear storage
     this.authState.next(false); // Update auth state
     this.route.navigateByUrl('/login')
   }

   /* updateAuthState(): void {
     const token = this.userStorageService.getTokenAuth();
     this.authState.next(!!token); // Update state
   } */

     updateAuthState(isAuthenticated: boolean): void {
      this.authState.next(isAuthenticated);
    }




}


