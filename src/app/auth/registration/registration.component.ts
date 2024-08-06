import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Register } from 'src/app/models/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userRegister!: FormGroup;

  passwordVisible = false;
  confirmPasswordVisible = false;

  get passwordType() {
    return this.passwordVisible ? 'text' : 'password';
  }

  get confirmPasswordType() {
    return this.confirmPasswordVisible ? 'text' : 'password';
  }

  constructor(
    public dialogRef: MatDialogRef<RegistrationComponent>,
    private authService: AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.userRegister = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      country: new FormControl('', Validators.required),
      birthdate: new FormGroup({
        day: new FormControl('', Validators.required),
        month: new FormControl('', Validators.required),
        year: new FormControl('', Validators.required)
      }),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]),
      confirmPassword: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    }, { validators: this.authService.passwordMatchValidator.bind(this.authService) });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  onSubmit(): void {
    if (this.userRegister.valid) {
      const birthdateGroup = this.userRegister.get('birthdate') as FormGroup;
      const day = String(birthdateGroup.get('day')?.value).padStart(2, '0');
      const month = String(birthdateGroup.get('month')?.value).padStart(2, '0');
      const year = String(birthdateGroup.get('year')?.value);

      const birthdate = `${year}-${month}-${day}`;

      const registrationData = {
        username: this.userRegister.get('username')?.value,
        password: this.userRegister.get('password')?.value,
        email: this.userRegister.get('email')?.value,
        birthdate: birthdate,
        phone: this.userRegister.get('phone')?.value,
        gender: this.userRegister.get('gender')?.value,
        country: this.userRegister.get('country')?.value
      };

      this.authService.register(registrationData).subscribe({
        next: (response) => {
          localStorage.setItem('username', registrationData.username);
          localStorage.setItem('email', registrationData.email);
          localStorage.setItem('phone', registrationData.phone);
          localStorage.setItem('gender', registrationData.gender);
          this.router.navigate(['/']);
          this.closeDialog();
        },
        error: (error) => {
          console.error('Registration error', error);
          alert('Registration failed. Please check your details and try again.');
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

}
