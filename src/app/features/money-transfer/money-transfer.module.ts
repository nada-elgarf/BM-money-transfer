import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyTransferRoutingModule } from './money-transfer-routing.module';
import { MoneyTransferComponent } from './money-transfer.component';
import { AmountComponent } from './amount/amount.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    MoneyTransferRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    MoneyTransferComponent,
    AmountComponent,
    PaymentComponent,
    ConfirmationComponent
  ]
})
export class MoneyTransferModule { }
