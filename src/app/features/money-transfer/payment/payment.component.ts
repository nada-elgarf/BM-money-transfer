import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransferService } from '../transfer.service'; // Import TransferService

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amount: string | null = null;
  convertedAmount: string | null = null;
  recipientName: string | null = null;
  recipientAccount: string | null = null;

  constructor(
    private router: Router,
    private transferService: TransferService // Inject TransferService
  ) { }

  ngOnInit(): void {
    // Retrieve transfer data from the service
    const data = this.transferService.getTransferData();
    if (data) {
      this.amount = data.amount;
      this.convertedAmount = data.convertedAmount;
      this.recipientName = data.recipientName;
      this.recipientAccount = data.recipientAccount;
    }
  }

  backHome() {
    this.router.navigate(['/']);
  }


}
