import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';



import { MoneyTransferModule } from './features/money-transfer/money-transfer.module';
import { MyAccountModule } from './features/my-account/my-account.module';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './features/home/home.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './auth/login/login.component';
import { IdleService } from './idle.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule ,
    MatDialogModule,
    MatButtonModule,
    SharedModule,
    MyAccountModule,
    MoneyTransferModule,
  ],

  providers: [IdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
