import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OtpService } from '../../services/otp.service';
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
  otpForm: FormGroup;
  isLoading = false;
  isOtpSent = false;
  verifToken: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
    private otpService: OtpService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      userprofile: ['', [Validators.required, Validators.minLength(2)]],
      name: ['', [Validators.required, Validators.pattern('^[234]{1}[0-9]{7}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
    });
  }

  // Step 1: Send OTP
  sendOtp(): void {
    if (this.registerForm.get('name')?.valid) {
      const phoneNumber = this.registerForm.get('name')?.value;
      this.isLoading = true;

      this.otpService.sendOtp(phoneNumber, 'MyApp').subscribe({
        next: (response) => {
          console.log('OTP sent:', response);
          this.isOtpSent = true;
          this.verifToken = response.verifToken; // Store verification token
          this.successMessage = 'OTP sent successfully. Please check your phone.';
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error sending OTP:', error);
          this.errorMessage = error?.error?.message || 'Error sending OTP. Please try again.';
          this.successMessage = '';
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Please provide a valid phone number.';
      this.successMessage = '';
    }
  }

  verifyOtpAndRegister(): void {
    if (this.otpForm.valid) {
      const otp = this.otpForm.get('otp')?.value;

      this.otpService.verifyOtp(otp, this.verifToken).subscribe({
        next: (response) => {
          console.log('OTP verified:', response);
          if (response.success) {
            this.successMessage = 'OTP verified successfully. Proceeding with registration.';
            this.errorMessage = '';
            this.registerUser(); // Proceed to user registration
          } else {
            this.errorMessage = 'Invalid or expired OTP.';
            this.successMessage = '';
          }
        },
        error: (error) => {
          console.error('Error verifying OTP:', error);
          this.errorMessage = error?.error?.message || 'Error verifying OTP. Please try again.';
          this.successMessage = '';
        },
      });
    } else {
      this.errorMessage = 'Please enter a valid OTP.';
      this.successMessage = '';
    }
  }

  private registerUser(): void {
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
  }

}
