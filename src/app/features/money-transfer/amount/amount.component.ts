import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FeaturesService } from '../../features.service';
import { Router } from '@angular/router';
import { TransferMoney } from 'src/app/models/transfer-money';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-amount',
  templateUrl: './amount.component.html',
  styleUrls: ['./amount.component.css']
})
export class AmountComponent implements OnInit {

  transferForm: FormGroup;
  convertedAmount: number | null = null;
  currencyOptions: string[] = [];
  exchangeRates: any = {};
  conversionRateText: string | null = null;
  recipientName: string | null = null;
  recipientAccount: string | null = null;
  fromAccount = 'xxxx7890';

  constructor(
    private featuresService: FeaturesService,
    private route: Router,
    private transferService: TransferService
  ) {
    this.transferForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initializeFormControls();
    this.loadExchangeRates();
  }

  private initializeFormControls(): void {
    this.transferForm = new FormGroup({
      amount: new FormControl(1, [Validators.required, Validators.min(1)]),
      fromCurrency: new FormControl('USD', Validators.required),
      toCurrency: new FormControl('EGP', Validators.required),
      recipientName: new FormControl('', Validators.required),
      recipientAccount: new FormControl('', [Validators.required])
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
      this.conversionRateText = `1 ${fromCurrency} = ${toRate / fromRate} ${toCurrency}`;
    } else {
      this.convertedAmount = null;
    }
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const amount = this.transferForm.get('amount')?.value;
      const convertedAmount = this.convertedAmount;
      const recipientName = this.transferForm.get('recipientName')?.value;
      const recipientAccount = this.transferForm.get('recipientAccount')?.value;

      const transferData: TransferMoney = {
        recipientName,
        recipientAccountNumber: recipientAccount
      };

      this.transferService.submitTransfer(transferData).subscribe(response => {
        console.log('Transfer successful', response);
        this.route.navigate(['/confirmation'], {
          queryParams: {
            amount,
            convertedAmount,
            recipientName,
            recipientAccount
          }
        });
      }, error => {
        console.error('Transfer failed', error);
      });
    }
  }
}
