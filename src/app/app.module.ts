import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartModule} from './chart/chart.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { TableComponent } from './table/table.component';
import {InfoBoxesModule} from './info-boxes/info-boxes.module';
import {TableModule} from './table/table.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {FooterModule} from './footer/footer.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartModule,
    LeafletModule.forRoot(),
    InfoBoxesModule,
    TableModule,
    FooterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
