import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { SectionComponent } from './shared/section/section.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'money-transfer',
    loadChildren: () => import('./features/money-transfer/money-transfer.module').then(m => m.MoneyTransferModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./features/my-account/my-account.module').then(m => m.MyAccountModule),
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
