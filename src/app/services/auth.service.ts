import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, catchError } from 'rxjs';
import { throwError } from 'rxjs';

interface AuthResponse {
  token: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080/auth';

  register(userData: any): Observable<AuthResponse> {
    console.log('Sending signup request to:', `${this.apiUrl}/signup`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, userData).pipe(
      tap((response: AuthResponse) => {
        console.log('Signup response:', response);

        if (response.token && response.token.trim()) {
          localStorage.setItem('token', response.token.trim());
          console.log('✓ Token saved successfully');
        }
      }),
      catchError((error: any) => {
        console.error('Signup error:', error);
        return throwError(() => error);
      })
    );
  }

  login(credentials: any): Observable<AuthResponse> {
    console.log('Sending login request to:', `${this.apiUrl}/login`);
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        console.log('Login response:', response);

        if (response.token && response.token.trim()) {
          localStorage.setItem('token', response.token.trim());
          console.log('✓ Token saved successfully');
        }
      }),
      catchError((error: any) => {
        console.error('Login error:', error);
        return throwError(() => error);
      })
    );
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