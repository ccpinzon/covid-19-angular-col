import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from './components/navbar/navbar.component';
import {AppRoutingModule} from '../app-routing.module';
import {FooterModule} from './components/footer/footer.module';


@NgModule({
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FooterModule
  ]
})
export class SharedModule { }
