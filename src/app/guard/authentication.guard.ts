
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserStorageService } from '../services/Storage/user-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    // Check if the user is authenticated by verifying the presence of a valid token
    const token = this.userStorageService.getTokenAuth();
    if (!token) {
      // Redirect to login if the token is not present
      return this.router.createUrlTree(['/login']);
    }

    // Check if the route specifies required roles
    const requiredRoles: string[] = route.data['role'];
    if (requiredRoles && requiredRoles.length > 0) {
      // Get the user's role
      const userRole: string = this.userStorageService.getUserAuth();
      // Check if the user has any of the required roles
      if (!userRole || !requiredRoles.includes(userRole)) {
        // Redirect to unauthorized page if user role doesn't match
        return this.router.createUrlTree(['/unauthorized']);
      }
    }

    // If the token is present and the user has the required role, allow access to the route
    return true;
  }
}
