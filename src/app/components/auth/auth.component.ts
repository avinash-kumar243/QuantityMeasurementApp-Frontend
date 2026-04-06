import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  errorMessage = '';
  successMessage = '';

  showForgotPasswordFlow = false;
  showForgotPasswordEmailStep = false;
  showOtpStep = false;
  showResetPasswordStep = false;

  forgotPasswordData = {
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  };

  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  authData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const oauth2 = params['oauth2'];

      if (token && oauth2 === 'success') {
        this.authService.handleGoogleToken(token);
        this.successMessage = 'Google login successful! Redirecting...';

        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1000);
      }
    });
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.cancelForgotPasswordFlow();
    this.clearMessages();
  }

  loginWithGoogle() {
    this.clearMessages();
    this.authService.loginWithGoogle();
  }

  openForgotPasswordFlow() {
    this.clearMessages();
    this.showForgotPasswordFlow = true;
    this.showForgotPasswordEmailStep = true;
    this.showOtpStep = false;
    this.showResetPasswordStep = false;

    this.forgotPasswordData = {
      email: this.authData.email || '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  cancelForgotPasswordFlow() {
    this.showForgotPasswordFlow = false;
    this.showForgotPasswordEmailStep = false;
    this.showOtpStep = false;
    this.showResetPasswordStep = false;

    this.forgotPasswordData = {
      email: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    };
  }

  requestOtp() {
    this.clearMessages();

    if (!this.forgotPasswordData.email) {
      this.errorMessage = 'Email is required!';
      return;
    }

    this.authService.requestOtp(this.forgotPasswordData.email).subscribe({
      next: (response: any) => {
        this.successMessage =
          typeof response === 'string'
            ? response
            : response?.message || 'OTP sent successfully to your email';

        this.showForgotPasswordEmailStep = false;
        this.showOtpStep = true;
        this.showResetPasswordStep = false;
      },
      error: (err) => {
        this.successMessage = '';
        console.error('requestOtp error:', err);

        this.errorMessage =
          err?.error?.message ||
          err?.error?.error ||
          (typeof err?.error === 'string' ? err.error : JSON.stringify(err?.error)) ||
          err?.message ||
          'Failed to send OTP.';
      }
    });
  }

  verifyOtp() {
    this.clearMessages();

    if (!this.forgotPasswordData.otp) {
      this.errorMessage = 'OTP is required!';
      return;
    }

    this.authService.verifyOtp(this.forgotPasswordData.email, this.forgotPasswordData.otp).subscribe({
      next: (response: any) => {
        const message =
          typeof response === 'string'
            ? response
            : response?.message || 'OTP verified successfully';

        if (message !== 'OTP verified successfully') {
          this.successMessage = '';
          this.errorMessage = message;
          return;
        }

        this.successMessage = message;
        this.showForgotPasswordEmailStep = false;
        this.showOtpStep = false;
        this.showResetPasswordStep = true;
      },
      error: (err) => {
        this.successMessage = '';
        console.error('verifyOtp error:', err);

        this.errorMessage =
          err?.error?.message ||
          err?.error?.error ||
          (typeof err?.error === 'string' ? err.error : JSON.stringify(err?.error)) ||
          err?.message ||
          'Invalid OTP.';
      }
    });
  }

  resetPassword() {
    this.clearMessages();

    if (!this.forgotPasswordData.newPassword || !this.forgotPasswordData.confirmPassword) {
      this.errorMessage = 'Both password fields are required!';
      return;
    }

    if (!this.isValidPassword(this.forgotPasswordData.newPassword)) {
      this.errorMessage =
        'Password must contain at least 1 uppercase, 1 lowercase, 1 digit, 1 special symbol, and be at least 8 characters long.';
      return;
    }

    if (this.forgotPasswordData.newPassword !== this.forgotPasswordData.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    const payload = {
      email: this.forgotPasswordData.email,
      otp: this.forgotPasswordData.otp,
      newPassword: this.forgotPasswordData.newPassword,
      confirmPassword: this.forgotPasswordData.confirmPassword
    };

    this.authService.resetPassword(payload).subscribe({
      next: (response: any) => {
        this.errorMessage = '';
        this.successMessage =
          typeof response === 'string'
            ? response
            : response?.message || 'Password reset successful! Redirecting to login...';

        setTimeout(() => {
          this.cancelForgotPasswordFlow();
          this.isLoginMode = true;
          this.authData.password = '';
          this.authData.confirmPassword = '';
          this.clearMessages();
          this.successMessage = 'Password updated successfully. Please login.';
        }, 1500);
      },
      error: (err) => {
        this.successMessage = '';
        console.error('resetPassword error:', err);

        this.errorMessage =
          err?.error?.message ||
          err?.error?.error ||
          (typeof err?.error === 'string' ? err.error : JSON.stringify(err?.error)) ||
          err?.message ||
          'Password reset failed.';
      }
    });
  }

  backToEmailStep() {
    this.clearMessages();
    this.showForgotPasswordEmailStep = true;
    this.showOtpStep = false;
    this.showResetPasswordStep = false;
  }

  backToOtpStep() {
    this.clearMessages();
    this.showForgotPasswordEmailStep = false;
    this.showOtpStep = true;
    this.showResetPasswordStep = false;
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