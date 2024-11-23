import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStorageService } from 'src/app/services/Storage/user-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories = ['LAW', 'ANNOUNCEMENT', 'SURVEY']; // Simplified categories
  isAuthenticated: boolean = false;
  authSubscription: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userStorageService: UserStorageService
  ) {}

  ngOnInit(): void {
    // Check if the user is authenticated at the start
    /* this.isAuthenticated = !!this.userStorageService.getTokenAuth();

    // Optionally, you can subscribe to an observable in `AuthService` if authentication state changes dynamically
    this.authService.authState$.subscribe((authState) => {
      this.isAuthenticated = authState;
    }); */

    this.authSubscription = this.authService.authState$.subscribe((authState) => {
      this.isAuthenticated = authState;
    });

  }

  logout() {
    this.userStorageService.signOut(); // Clear token and user data
    this.isAuthenticated = false; // Update local state
    this.router.navigate(['/login']); // Redirect to login page
  }
}
