import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Register } from '../models/register';
import { Login } from '../models/login';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/register';
  private loginUrl = '/api/login';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) { }

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const form = formGroup as FormGroup;
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }

  register(userData: Register): Observable<Register> {
    return this.http.post<Register>(this.apiUrl, userData, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap((response) => {
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('phone', response.phone);
        localStorage.setItem('gender', response.gender);
        this.updateAuthStatus();
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed. Please try again.'));
      })
    );
  }


  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(this.loginUrl, { email, password }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('username');
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('gender');
    this.updateAuthStatus();
  }

  private updateAuthStatus(): void {
    this.authStatusSubject.next(this.isLoggedIn());
  }
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
