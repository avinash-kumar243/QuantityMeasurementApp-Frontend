import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  errorMessage = '';
  successMessage = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  authData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.clearMessages();
  }

  private isValidUsername(username: string): boolean {
    return /^(?=.*[A-Z])(?=.*[a-z]).+$/.test(username);
  }

  private isValidEmail(email: string): boolean {
    return /^(?=.*\d)(?=.*[^\w\s]).+@.+\..+$/.test(email);
  }

  private isValidPassword(password: string): boolean {
    return /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password);
  }

  onSubmit() {
    this.clearMessages();

    if (!this.authData.email || !this.authData.password) {
      this.errorMessage = 'Email and password are required!';
      return;
    }

    if (!this.isLoginMode) {
      if (!this.authData.username) {
        this.errorMessage = 'Username is required!';
        return;
      }

      if (!this.isValidUsername(this.authData.username)) {
        this.errorMessage =
          'Username must contain at least 1 uppercase letter and 1 lowercase letter.';
        return;
      }

      if (!this.isValidEmail(this.authData.email)) {
        this.errorMessage =
          'Email must contain at least 1 digit, 1 special symbol, @ and .';
        return;
      }

      if (!this.isValidPassword(this.authData.password)) {
        this.errorMessage =
          'Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special symbol, and be at least 8 characters long.';
        return;
      }

      if (this.authData.password !== this.authData.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      const signupData = {
        username: this.authData.username,
        email: this.authData.email,
        password: this.authData.password
      };

      this.authService.register(signupData).subscribe({
        next: () => {
          this.errorMessage = '';
          this.successMessage = 'Signup successful! Redirecting to login...';

          setTimeout(() => {
            this.isLoginMode = true;
            this.authData = {
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            };
            this.clearMessages();
          }, 2000);
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage =
            err.error?.message || err.message || 'Signup failed. Please try again.';
        }
      });

    } else {
      const loginData = {
        email: this.authData.email,
        password: this.authData.password
      };

      this.authService.login(loginData).subscribe({
        next: () => {
          this.errorMessage = '';
          this.successMessage = 'Login successful! Redirecting...';

          setTimeout(() => {
            this.clearMessages();
            this.router.navigate(['/dashboard']);
          }, 1000);
        },
        error: (err) => {
          this.successMessage = '';
          this.errorMessage =
            err.error?.message || err.message || 'Login failed. Invalid credentials.';
        }
      });
    }
  }
}