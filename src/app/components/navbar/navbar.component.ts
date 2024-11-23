import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  categories = ['LAW', 'ANNOUNCEMENT', 'SURVEY']; // Simplified categories
  isAuthenticated: boolean = false;
  fromGroup!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state
    
  }

  logout() {
    this.authService.logout();
    this.isAuthenticated = this.authService.isAuthenticated;
  }
}
