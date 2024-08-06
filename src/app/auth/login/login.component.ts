import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { IdleService } from 'src/app/idle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  passwordVisible: boolean = false;
  showAlert: boolean = false;  // Add this property

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private idleService: IdleService,
    private router: Router,
  ) { }

  ngOnInit() {
    // Check if we should show the alert message
    this.showAlert = this.idleService.getLogoutStatus();

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@!$%^&*])[A-Za-z\d@!$%^&*]{8,}/)
      ])
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          this.idleService.clearLogoutStatus();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Login error', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
