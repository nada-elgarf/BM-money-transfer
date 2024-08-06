import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../../features.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  copyMessage: string = '';
  paymentHistory: any[] = [];

  constructor(private featuresService: FeaturesService) { }

  ngOnInit() {
    this.loadPaymentHistory();
  }

  loadPaymentHistory() {
    this.featuresService.getPaymentHistory().subscribe(
      (response: any) => {
        this.paymentHistory = response.transactions;
      },
      (error: any) => {
        console.error('Failed to load payment history', error);
      }
    );
  }

  copyText(): void {
    const backgroundTextElement = document.querySelector('.background-text') as HTMLElement;

    if (backgroundTextElement) {
      const text: string = backgroundTextElement.innerText;
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();

      try {
        document.execCommand('copy');
        this.copyMessage = 'Text copied to clipboard!';
        setTimeout(() => {
          this.copyMessage = '';
        }, 3000);
      } catch (err) {
        console.error('Failed to copy text', err);
        this.copyMessage = 'Failed to copy text';
        setTimeout(() => {
          this.copyMessage = '';
        }, 3000);
      } finally {
        document.body.removeChild(textarea);
      }
    } else {
      console.error('Element with class "background-text" not found');
      this.copyMessage = 'Text element not found';

      setTimeout(() => {
        this.copyMessage = '';
      }, 3000);
    }
  }
}
