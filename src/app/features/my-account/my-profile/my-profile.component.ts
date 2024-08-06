import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../../features.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  balance: number | null = null;
  profileInfo: any = {};
  exchangeRates: any;

  constructor(
    private featuresService: FeaturesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadProfileInfo();
    this.loadBalance();
    this.loadExchangeRates();
  }

  loadProfileInfo() {
    this.profileInfo = {
      firstName: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      phone: localStorage.getItem('phone'),
      gender: localStorage.getItem('gender')
    };
  }

  loadBalance() {
    this.featuresService.getBalance().subscribe(
      (response: any) => {
        this.balance = response.balance;
      },
      (error: any) => {
        console.error('Failed to load balance', error);
      }
    );
  }

  loadExchangeRates() {
    // Fetch exchange rates
    this.featuresService.getExchangeRates().subscribe(
      (rates: any) => {
        this.exchangeRates = rates;
      },
      (error: any) => {
        console.error('Failed to load exchange rates', error);
      }
    );
  }
}
