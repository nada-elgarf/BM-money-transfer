import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransferService } from '../transfer.service'; // Import TransferService

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  amount: string | null = null;
  convertedAmount: string | null = null;
  recipientName: string | null = null;
  recipientAccount: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService // Inject TransferService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'];
      this.convertedAmount = params['convertedAmount'];
      this.recipientName = params['recipientName'];
      this.recipientAccount = params['recipientAccount'];
    });
  }

  confirm(): void {
    this.transferService.setTransferData({
      amount: this.amount,
      convertedAmount: this.convertedAmount,
      recipientName: this.recipientName,
      recipientAccount: this.recipientAccount
    });

    this.router.navigate(['/money-transfer/payment']);
  }

  back(): void {
    this.router.navigate(['/money-transfer']);
  }
}
