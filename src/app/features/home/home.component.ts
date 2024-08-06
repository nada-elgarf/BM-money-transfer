import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeaturesService } from '../features.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  transferForm: FormGroup;
  convertedAmount: number | null = null;
  currencyOptions: string[] = [];
  exchangeRates: any = {};
  conversionRateText: string | null = null;
  recipientName: string | null = null;
  recipientAccount: string | null = null;
  fromAccount = 'xxxx7890';
  isLoggedIn = false;

  constructor(
    private featuresService: FeaturesService , private authService: AuthService ) {
    this.transferForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.loadExchangeRates();
    this.checkLoginStatus();
    this.authService.authStatus$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  private initializeFormControls(): void {
    this.transferForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      fromCurrency: new FormControl('USD', Validators.required),
      toCurrency: new FormControl('EGP', Validators.required),
      recipientName: new FormControl('', Validators.required),
      recipientAccount: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{8}$')]),
    });
  }

  private loadExchangeRates(): void {
    this.featuresService.getExchangeRates().subscribe(rates => {
      this.exchangeRates = rates;
      this.currencyOptions = Object.keys(rates);
      this.convertAmount();
    });
  }

  convertAmount(): void {
    const amount = this.transferForm.get('amount')?.value;
    const fromCurrency = this.transferForm.get('fromCurrency')?.value;
    const toCurrency = this.transferForm.get('toCurrency')?.value;

    if (amount <= 0) {
      this.convertedAmount = null;
      this.conversionRateText = null;
      return;
    }

    if (fromCurrency && toCurrency && this.exchangeRates[fromCurrency] && this.exchangeRates[toCurrency]) {
      const fromRate = this.exchangeRates[fromCurrency];
      const toRate = this.exchangeRates[toCurrency];
      this.convertedAmount = (amount / fromRate) * toRate;
    } else {
      this.convertedAmount = null;
    }
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      this.recipientName = this.transferForm.get('recipientName')?.value;
      this.recipientAccount = this.transferForm.get('recipientAccount')?.value;
    }
  }
  private checkLoginStatus(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
