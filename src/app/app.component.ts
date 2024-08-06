import { Component, OnInit } from '@angular/core';
import { IdleService } from './idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public loggedOut = false;

  constructor(private idleService: IdleService) {}

  ngOnInit() {
    this.idleService.logoutStatus.subscribe(loggedOut => {
      this.loggedOut = loggedOut;
    });
  }

  public onLogin() {
    this.idleService.clearLogoutStatus();
  }
}
