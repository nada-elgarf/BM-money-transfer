import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountComponent } from './my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',component: MyAccountComponent,
    children: [
      { path: '', component: MyProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'payment-history', component: PaymentHistoryComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyAccountRoutingModule { }
