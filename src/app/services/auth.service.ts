import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';

interface AuthResponse {
  token: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private backendBaseUrl = environment.backendBaseUrl;
  private apiUrl = `${this.backendBaseUrl}/auth`;

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, userData).pipe(
      tap((response: AuthResponse) => {
        if (response.token && response.token.trim()) {
          localStorage.setItem('token', response.token.trim());
        }
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        if (response.token && response.token.trim()) {
          localStorage.setItem('token', response.token.trim());
        }
      }),
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
 
  loginWithGoogle(): void {
    window.location.href = `${this.backendBaseUrl}/oauth2/authorization/google`;
  }

  handleGoogleToken(token: string): void {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
