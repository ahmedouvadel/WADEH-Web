import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {jwtDecode} from "jwt-decode";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


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
  username: any;

 constructor( private http:HttpClient,
   private route:Router,
 ) {}

 public login(username: string, password: string) {
   const headers = new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded");

   const params = new HttpParams().set("username",username).set("password",password);
   return this.http.post(this.urlLogin, params , {headers} );
 }

 loadProfile(res: any):void {
   this.isAuthenticated=true
   this.accessToken=res['access-token']
   const decodeJwt:any = jwtDecode(this.accessToken)
   this.username=decodeJwt.sub
   this.roles=decodeJwt.scope
   console.log(this.roles,this.username)
   window.localStorage.setItem('username',decodeJwt.sub)
   window.localStorage.setItem('token',this.accessToken)
   window.localStorage.setItem('role',decodeJwt.scope)
   }

  logout() {
    this.isAuthenticated=false;
   window.localStorage.clear()
   this.route.navigateByUrl('/login')
 }

}


