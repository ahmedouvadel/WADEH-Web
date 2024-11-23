import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: User = { name: '', number: '', password: '' };
  loginForm: FormGroup;
  isLoading = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern('^[234]{1}[0-9]{7}$')]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      let username = this.loginForm.value.number;
      let password = this.loginForm.value.password;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          console.log(res)
          this.authService.loadProfile(res); //8ahrli nak lahi tem transmeti les donne cm sa beyn les service
          console.log('User logged in:', res);
          // Redirection vers la page d'accueil en cas de succès
          this.router.navigateByUrl("");
          this.authService.updateAuthState(true);        },
        error: (error) => {
          console.error('Error logging in:', error);
          this.isLoading = false;
          this.errorMessage = 'Erreur lors de la connexion. Veuillez vérifier vos informations et réessayer.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      console.log("Le formulaire est invalide");
    }
  }
}
