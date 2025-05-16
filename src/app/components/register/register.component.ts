import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserDTO } from '../../models/userdto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userprofile: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.pattern('^[234]{1}[0-9]{7}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerUser(): void {
    if (this.registerForm.valid) {
      const user: UserDTO = this.registerForm.value;
      this.isLoading = true;

      this.userService.registerUser(user).subscribe({
        next: (response) => {
          console.log('User registered:', response);
          this.successMessage = 'Registration successful. Redirecting to login.';
          this.errorMessage = '';
          setTimeout(() => this.router.navigate(['/login']), 3000);
        },
        error: (error) => {
          console.error('Error registering user:', error);
          this.errorMessage = error?.error?.message || 'Registration failed. Please try again.';
          this.successMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.successMessage = '';
    }
  }
}
