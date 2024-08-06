import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { RegistrationComponent } from 'src/app/auth/registration/registration.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      this.username = localStorage.getItem('username');
    });
  }

  openDialogLogin() {
    this.dialog.open(LoginComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh'
    });
  }

  openDialogRegister() {
    this.dialog.open(RegistrationComponent, {
      width: '100vw',
      maxWidth: '100vw',
      height: '100vh',
      maxHeight: '100vh'
    });
  }
  getInitials(): string {
    if (this.username) {
      const initials = this.username.split(' ').map(name => name.charAt(0)).join('');
      return initials.toUpperCase();
    }
    return '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
