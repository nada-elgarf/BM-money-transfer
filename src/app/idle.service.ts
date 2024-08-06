import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private readonly TIMEOUT_DURATION = 5 * 60 * 1000;
  private idleTimer: any;
  private loggedOut$ = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, private http: HttpClient, private ngZone: NgZone) {
    this.startMonitoring();
  }

  private startMonitoring() {
    this.resetTimer();
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.resetTimer.bind(this));
      document.addEventListener('keypress', this.resetTimer.bind(this));
    });
  }

  private resetTimer() {
    clearTimeout(this.idleTimer);
    this.idleTimer = setTimeout(() => {
      this.logout();
    }, this.TIMEOUT_DURATION);
  }

  private logout() {
    this.http.post('/api/logout', {}).subscribe(() => {
      this.loggedOut$.next(true);
      this.router.navigate(['/login']);
    });
  }

  public getLogoutStatus(): boolean {
    return this.loggedOut$.getValue();
  }

  public clearLogoutStatus() {
    this.loggedOut$.next(false);
  }

  public get logoutStatus() {
    return this.loggedOut$.asObservable();
  }
}
