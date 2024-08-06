import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SectionComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    NavbarComponent,
    SectionComponent,
    FooterComponent
  ]
})
export class SharedModule { }
