import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MyAccountRoutingModule } from './my-account-routing.module';


import { MyAccountComponent } from './my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentHistoryComponent } from './payment-history/payment-history.component';
import { SettingsComponent } from './settings/settings.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    MyAccountRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [MyAccountComponent,
    ChangePasswordComponent,
    MyProfileComponent,
    PaymentHistoryComponent,
    SettingsComponent,
    SidebarComponent
  ]
})
export class MyAccountModule { }
