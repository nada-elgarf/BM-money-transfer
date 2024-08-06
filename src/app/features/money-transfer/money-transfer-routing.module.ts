import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoneyTransferComponent } from './money-transfer.component';
import { AmountComponent } from './amount/amount.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '', component: MoneyTransferComponent,
      children: [
        { path: '', component: AmountComponent },
      { path: 'confirmation', component: ConfirmationComponent },
      { path: 'payment', component: PaymentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoneyTransferRoutingModule { }
